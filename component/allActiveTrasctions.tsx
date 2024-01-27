import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { backend_url, handle500Error } from "./helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, ToastAndroid, View, Button, ScrollView } from "react-native";
import Loader from "./commons/Loader";
import { Text } from "react-native-elements";
import CommonHeader from "./commonHeader";
import ProductItem from "./commons/productItem";
import { ProductType, UserObjType } from "../interfaces";

const AllActiveTrasctions = () => {
    const [loading, setLoading] = useState(false)
    const [transcutionInfo, setTranscutionInfo] = useState<null | {
        amount: number;
        product_name: string;
        transaction_id: string;
    }[]>(null)
    const [productsData, setProductsData] = useState<null | ProductType[]>(null)
    const [user, setUser] = useState<null | UserObjType>(null)
    useEffect(() => {
        getData()
    }, [])
    useFocusEffect(() => {
        AsyncStorage.getItem("user").then((result) => {
            if (result) { setUser(JSON.parse(result)) }
        })
    })

    function getImageUrlFromName(name: string) {
        if (productsData) {
            return (productsData.filter((product) => product.title === name))[0]?.imageSource ?? "https://st2.depositphotos.com/1000128/6284/i/950/depositphotos_62849373-stock-photo-gold-ingots.jpg"
        }
    }

    const getData = () => {
        setLoading(true)
        axios.get(backend_url + "/api/v1/user/getAllProduct").then(({ data }) => {
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

                        setTranscutionInfo(data.data)
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
    const handleReedemButton = () => {
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
                    Alert.alert("Message", "Point has reedemed!!")
                } else {
                    if (data && data.message) {
                        Alert.alert("Error", data.message)
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
        <CommonHeader title="My Transactions" previousPage="" />
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                {transcutionInfo && transcutionInfo.length > 0 ? (
                    transcutionInfo.map((data, index) => (
                        <View key={index}>
                            <ProductItem
                                imageSource={getImageUrlFromName(data.product_name) ?? ""}
                                link={""}
                                price={(data.amount).toString()}
                                title={data.product_name}
                                transaction_id={data.transaction_id}
                            />
                        </View>
                    ))
                ) : (
                    !loading ? (
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text>Looks like you have no transactions</Text>
                        </View>
                    ) : <Text></Text>
                )}
            </ScrollView>
            <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                {transcutionInfo && transcutionInfo.length ? (
                    <Button
                        title="Redeem Your Daily Earning"
                        color="#7a9f86"
                        onPress={handleReedemButton}
                    />
                ) : <Text></Text>}
            </View>
        </View>
        <Loader visible={loading} />
    </>

    )

}

export default AllActiveTrasctions;