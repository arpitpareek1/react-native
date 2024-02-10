import axios from "axios";
import { backend_url, handle500Error } from "./helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, View, Button, ScrollView } from "react-native";
import Loader from "./commons/Loader";
import { Text } from "react-native-elements";
import CommonHeader from "./commonHeader";
import ProductItem from "./commons/productItem";
import { ProductType, UserObjType } from "../interfaces";

const AllActiveTrasctions = () => {
    const [loading, setLoading] = useState(false)
    const [transactionInfo, setTransactionInfo] = useState<null | {
        amount: number;
        product_name: string;
        transaction_id: string;
        status: string;
    }[]>(null)
    const [productsData, setProductsData] = useState<null | ProductType[]>(null)
    const [user, setUser] = useState<null | UserObjType>(null)

    useEffect(() => {
        console.log("useEffect called");
        getData()
    }, [])

    useEffect(() => {
        AsyncStorage.getItem("user").then((result) => {
            if (result) { setUser(JSON.parse(result)) }
        })
    }, [])

    function getImageUrlFromName(name: string) {
        if (productsData) {
            return (productsData.filter((product) => product.title === name))[0]?.imageSource ?? "https://st2.depositphotos.com/1000128/6284/i/950/depositphotos_62849373-stock-photo-gold-ingots.jpg"
        }
    }

    const getData = () => {
        setLoading(true)
        axios.get(backend_url + "/api/v1/user/getAllProduct").then(({ data }) => {
            console.log("data", data);

            setProductsData(data)
        }).catch((error) => {
            handle500Error(error.message)
        })
        AsyncStorage.getItem("user").then((result) => {
            if (result) {
                const user = JSON.parse(result)
                axios.post(backend_url + "/api/v1/transactions/getTransactionForUser", {
                    email: user.email
                }).then(({ data }) => {
                    console.log(data);
                    if (data && data.success) {
                        console.log(data.data);
                        setTransactionInfo(data.data)
                    } else {
                        Alert.alert("Error", "Something wend wrong")
                    }
                }).catch((error) => {
                    handle500Error(error.message)
                }).finally(() => {
                    setLoading(false)
                })
            }
        })
    }
    const handleRedeemButton = () => {
        if (!user || !user.email) {
            Alert.alert("Message", "Something went wrong");
            return
        }
        setLoading(true)
        axios.post(backend_url + "/api/v1/transactions/redeemBalance", {
            email: user.email
        })
            .then(({ data }) => {
                if (data && data.status) {
                    Alert.alert("Message", "Point has redeemed!!")
                } else {
                    if (data && data.message) {
                        Alert.alert("Alert", data.message)
                    }
                }
            })
            .catch((error) => {
                handle500Error(error.message)
            })
            .finally(() => {
                setLoading(false)
            })

    }

    return (
        <>
            <CommonHeader title="My Orders" previousPage="" />
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    {transactionInfo && transactionInfo.length > 0 && transactionInfo.filter((tra) => !["ADDED_TO_WALLET", "GETTING_SPINNER_CHANCES", "LUCKY_SPIN_WIN", "REFER_TRANSACTION"].includes(tra.product_name)).length ? (
                        transactionInfo.filter((tra) => !["ADDED_TO_WALLET", "LUCKY_SPIN_WIN", "GETTING_SPINNER_CHANCES", "REFER_TRANSACTION"].includes(tra.product_name)).map((data, index) => (
                            <View key={index}>
                                <ProductItem
                                    imageSource={getImageUrlFromName(data.product_name) ?? "https://img.freepik.com/free-vector/mobile-banking-return-money-from-purchases-conduct-financial-transactions-remotely-with-mobile-device-vector-isolated-concept-metaphor-illustration_335657-2799.jpg?t=st=1706804653~exp=1706805253~hmac=5ae6c6b305bd9f34f25bcbfd19ad075ab336d487c959336c1f0bafcf04608589"}
                                    link={""}
                                    price={(data.amount).toString()}
                                    title={data.product_name}
                                    transaction_id={data.transaction_id}
                                    traStatus={data.status || "Active"}
                                />
                            </View>
                        ))
                    ) : (
                        !loading ? (
                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingTop: 150,
                            }}>
                                <Text>Looks like you have no Orders</Text>
                            </View>
                        ) : <Text></Text>
                    )}
                </ScrollView>
                <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                    {transactionInfo && transactionInfo.length ? (
                        <Button
                            title="Redeem Your Daily Earning"
                            color="#7a9f86"
                            onPress={handleRedeemButton}
                        />
                    ) : <Text></Text>}
                </View>
            </View>
            <Loader visible={loading} />
        </>

    )

}

export default AllActiveTrasctions;