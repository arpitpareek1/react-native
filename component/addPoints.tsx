import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView, Alert, Image, ToastAndroid } from 'react-native';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import {
    responsiveFontSize,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import RNUpiPayment from 'react-native-upi-payment';
import CommonHeader from './commonHeader';
import axios from 'axios';
import { backend_url, handle500Error, updateUserInfo } from './helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserObjType } from '../interfaces';
import Loader from './commons/Loader';

const AddFundScreen = ({ route }) => {
    const [points, setPoints] = useState('');
    const [pointsError] = useState('');
    const [user, setUser] = useState<null | UserObjType>(null)
    const [upi, setUpi] = useState<null | string>(null)
    const [limit, setLimit] = useState<null | string>(null)


    useEffect(() => {
        axios.get(backend_url + "/api/v1/settings/getAll").then(({ data }) => {
            console.log(data);
            if (data && data.length) {
                const upi = data.filter((setting) => setting.key === "upi_id")
                const recharge_limit = data.filter((setting) => setting.key === "recharge_limit")
                if (recharge_limit) {
                    setLimit(recharge_limit[0].value)
                } else {
                    ToastAndroid.showWithGravity(
                        "Failed to get UPI settings, Please Try to relaunch the app",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                }
                if (upi) {
                    console.log(upi);

                    setUpi(upi[0].value)
                } else {
                    ToastAndroid.showWithGravity(
                        "Failed to get UPI settings, Please Try to relaunch the app",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                }
            } else {
                ToastAndroid.showWithGravity(
                    "Failed to get UPI settings, Please Try to relaunch the app",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }
        }).catch((err) => {
            console.log(err);
            ToastAndroid.showWithGravity(
                "Failed to get UPI settings, Please Try to relaunch the app",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        })
        if (route.params && route.params.pointsToAdd) {
            setPoints(String(route.params.pointsToAdd))
        }
        AsyncStorage.getItem("user").then((result) => {
            if (result) { setUser(JSON.parse(result)) }
        })
    }, [])

    async function onPaymentSuccess() {
        axios.post(backend_url + "/api/v1/transactions/addMoneyToWallet", {
            email: user?.email,
            amount: points,
            method: "RECHARGE"
        }).then(async ({ data }) => {
            console.log("data", data);
            if (data.status) {
                let msg = points + " Added to your wallet"
                if (route.params && route.params.pointsToAdd) {
                    msg += ", Now you can place the order."
                }
                ToastAndroid.showWithGravity(
                    msg,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
                updateUserInfo()
            }
        }).catch((error) => {
            handle500Error(error.message)
        })
    }

    // 'shreeshyamenterprise.39830835@hdfcbank'
    // {"ApprovalRefNo": "402139460031", "Status": "SUCCESS", "responseCode": "0", "status": undefined, "txnId": "PTM0b20c5fdec2645db9385889d023d1559"}
    const handleAddPoints = () => {
        if (upi && points && Number(points) !== 0 && limit && Number(points) >= Number(limit)) {
            RNUpiPayment.initializePayment(
                {
                    vpa: upi,
                    payeeName: 'Riotinto',
                    amount: Number(points),
                    transactionRef: 'aaasf-332-aoei-fn',
                    transactionNote: 'Riotinto App',
                },
                async (r) => {
                    await onPaymentSuccess()
                },
                async (err) => {
                    console.log("err", err);
                    if (typeof err === "object" && err.hasOwnProperty("Status") && err.Status === "Success") {
                        await onPaymentSuccess()
                    } else {
                        ToastAndroid.showWithGravity(
                            "Looks Like payment has cancel from your side.",
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER,
                        );
                    }
                },
            );
        } else {
            if (!(Number(points) >= Number(limit))) {
                return Alert.alert("Alert", "Minimum Recharge limit is " + limit + ". Please insert higher value")
            }
            if (!upi) {
                return Alert.alert("Alert", "No internet found!!!")
            }
            Alert.alert("Alert", "Please insert a valid value.")
        }
    }
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <CommonHeader title="Add Points" previousPage="" />
            <ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 20, paddingVertical: 50 }}>
                    <Image
                        source={{
                            uri: 'https://img.freepik.com/free-vector/revenue-concept-illustration_114360-2803.jpg',
                        }}
                        style={{
                            width: Dimensions.get('window').width / 1.5,
                            height: Dimensions.get('window').width / 1.5,
                        }}
                    />

                </View>
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', margin: responsiveWidth(5), width: Dimensions.get('window').width, flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'column', marginBottom: pointsError ? responsiveWidth(3) : responsiveWidth(1.5) }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderRadius: responsiveWidth(50),
                                borderColor: '#ccc',
                                borderWidth: 1,
                                paddingBottom: responsiveWidth(2.2),
                                marginBottom: responsiveWidth(1.5),
                                width: responsiveWidth(89),
                            }}>
                            <TextInput
                                placeholder={'Enter Points'}
                                keyboardType={'phone-pad'}
                                onChangeText={(text) => { setPoints(text); }}
                                value={points}
                                maxLength={5}
                                editable={!(route.params && route.params.pointsToAdd)}
                                placeholderTextColor="#7a9f86"
                                style={{ flex: 1, paddingVertical: responsiveWidth(0.1), color: '#7a9f86', fontSize: responsiveFontSize(2), paddingHorizontal: responsiveWidth(4), paddingTop: responsiveWidth(2) }}
                            />
                        </View>
                        <Text style={{ color: '#7a9f86', fontSize: responsiveFontSize(1.6), fontFamily: 'Roboto-Regular', marginLeft: responsiveWidth(1) }}>{pointsError}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => { handleAddPoints() }}
                        style={{
                            marginBottom: responsiveWidth(2),
                            flexDirection: 'row',
                            justifyContent: 'center',
                            width: responsiveWidth(90)
                        }}>
                        <Text
                            style={{
                                backgroundColor: '#7a9f86',
                                padding: responsiveWidth(3),
                                borderRadius: 60,
                                textAlign: 'center',
                                fontWeight: '700',
                                fontSize: responsiveFontSize(2),
                                color: '#fff',
                                paddingHorizontal: 30
                            }}>
                            Add Points
                        </Text>
                    </TouchableOpacity>
                    {route.params === undefined &&
                        <>
                            <Text style={{
                                fontSize: responsiveFontSize(2),
                                color: '#7a9f86',
                                marginBottom: responsiveWidth(3),
                                fontWeight: "600",
                                paddingTop: 30,
                                paddingBottom: 10
                            }}>Select Points Amount:</Text>
                            <View style={{
                                flexDirection: 'row',
                                gap: responsiveWidth(3),
                                flexWrap: 'wrap',
                                maxWidth: responsiveWidth(Dimensions.get('window').width)
                            }}>
                                {["500", "1000", "1500", "2000", "2500"].map((price, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => { setPoints(price); }}
                                        style={{
                                            backgroundColor: '#7a9f86',
                                            padding: responsiveWidth(3),
                                            borderRadius: 30,
                                            width: responsiveWidth(28),
                                        }}>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                fontWeight: '700',
                                                fontSize: responsiveFontSize(2.2),
                                                color: '#fff',
                                            }}>
                                            {price}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </>
                    }
                </View>
            </ScrollView>
            <Loader visible={upi === null} />
        </GestureHandlerRootView>
    );
};

export default AddFundScreen;