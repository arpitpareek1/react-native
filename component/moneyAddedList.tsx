import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { backend_url, handle500Error } from './helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, View, ScrollView } from 'react-native';
import Loader from './commons/Loader';
import { Text } from 'react-native-elements';
import CommonHeader from './commonHeader';
import ProductItem from './commons/productItem';
import { UserObjType } from '../interfaces';

const MoneyToWalletList = () => {
    const [loading, setLoading] = useState(false);
    const [transcutionInfo, setTranscutionInfo] = useState<
        | null
        | {
            amount: number;
            product_name: string;
            transaction_id: string;
            createdAt: string
        }[]
    >(null);

    const [withdrawData, setWithDrawData] = useState<{
        amount: number
        bank_name?: string
        cardInfo?: string
        createdAt: string
        ifsc?: string
        status: string
        updatedAt: string
        upi_id: string
        userId: string
    }[] | null>(null)
    const [user, setUser] = useState<null | UserObjType>(null);
    useEffect(() => {
        getData();
    }, []);

    useFocusEffect(() => {
        AsyncStorage.getItem('user').then(result => {
            if (result) {
                setUser(JSON.parse(result));
            }
        });
    });

    const getData = () => {
        setLoading(true);
        AsyncStorage.getItem('user').then(result => {
            if (result) {
                const user = JSON.parse(result);
                axios
                    .post(backend_url + '/api/v1/transactions/getTransactionForUser', {
                        email: user.email,
                    })
                    .then(({ data }) => {
                        console.log(data);
                        if (data && data.success) {
                            console.log(data.data);

                            setTranscutionInfo(data.data);
                        } else {
                            Alert.alert('Error', 'Something wend wrong');
                        }
                    })
                    .catch(error => {
                        handle500Error(error.message);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
                axios
                    .post(backend_url + '/api/v1/transactions/getWithDrawReqs', {
                        email: user.email,
                    })
                    .then(({ data }) => {
                        console.log(data);
                        if (data && data.message === "Success") {
                            console.log("withDawr", data.data);
                            setWithDrawData(data.data);
                        } else {
                            Alert.alert('Error', 'Something wend wrong');
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        handle500Error(error.message);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        });
    };

    return (
        <>
            <CommonHeader title="My Transactions" previousPage="" />
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    {transcutionInfo && transcutionInfo.length > 0 ? (
                        transcutionInfo
                            .filter(tra => tra.product_name === 'ADDED_TO_WALLET')
                            .map((data, index) => (
                                <View key={index}>
                                    <ProductItem
                                        imageSource={"https://img.freepik.com/free-vector/mobile-banking-return-money-from-purchases-conduct-financial-transactions-remotely-with-mobile-device-vector-isolated-concept-metaphor-illustration_335657-2799.jpg?t=st=1706804653~exp=1706805253~hmac=5ae6c6b305bd9f34f25bcbfd19ad075ab336d487c959336c1f0bafcf04608589"}
                                        link={''}
                                        price={" +" + data.amount.toString() + " Cr"}
                                        title={"Points Added"}
                                        date={new Date(data.createdAt).toDateString()}
                                    />
                                </View>
                            ))
                    ) : !loading ? (
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text>Looks like you have no transactions</Text>
                        </View>
                    ) : (
                        <Text></Text>
                    )}
                    {withdrawData && withdrawData.length > 0 ? (
                        withdrawData
                            .map((data, index) => (
                                <View key={index}>
                                    <ProductItem
                                        imageSource={"https://img.freepik.com/free-vector/e-shopping-cartoon-web-icon-online-store-cashback-service-money-returning-financial-refund-idea-return-investment-internet-income-vector-isolated-concept-metaphor-illustration_335657-2734.jpg?w=740&t=st=1706808408~exp=1706809008~hmac=ac11edcffb5c5877eec09448afeeeeb086e56e65e576d445358fa577afc204ff"}
                                        link={''}
                                        price={" -" + data.amount.toString() + " Dr"}
                                        title={"Withdraw Request"}
                                        status={data.status}
                                        date={new Date(data.createdAt).toDateString()}
                                    />
                                </View>
                            ))) :
                        <View></View>
                    }
                </ScrollView>
                {/* <View
                    style={{
                        padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 10,
                    }}>
                </View> */}
            </View>
            <Loader visible={loading} />
        </>
    );
};

export default MoneyToWalletList;
