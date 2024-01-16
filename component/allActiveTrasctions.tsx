import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { backend_url, handle500Error } from "./helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import Loader from "./commons/Loader";
import { Text } from "react-native-elements";
import CommonHeader from "./commonHeader";

const AllActiveTrasctions = () => {
    const [loading, setLoading] = useState(false)
    const [transcutionInfo, setTranscutionInfo] = useState<null | {
        amount: number;
        product_name: string;
        transaction_id: string;
    }[]>(null)

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        console.log("kgdhfjjfh");
        setLoading(true)
        AsyncStorage.getItem("user").then((result) => {
            if (result) {
                const user = JSON.parse(result)
                axios.post(backend_url + "/api/v1/transactions/getTransactionForUser", {
                    email: user.email
                }).then(({
                    data
                }) => {
                    console.log(data);
                    if (data && data.success) {
                        setTranscutionInfo(data.data)
                    } else {
                        Alert.alert("Error", "Something wend wrong")
                    }
                }).catch((error) => {
                    handle500Error(error.message, Alert)
                }).finally(() => {
                    setLoading(false)
                })
            }
        })
    }

    return (
        <>
            <CommonHeader title="My Transuctions" previousPage="" />
            <View>
                {
                    transcutionInfo && transcutionInfo.map((data, index) => (
                        <View key={index}>
                            <Text>
                                gdfjddjjd
                            </Text>
                        </View>
                    ))
                }
                {
                    !loading && transcutionInfo && transcutionInfo.length === 0 && (
                        <>
                            <Text>Looks like you have no transcutions</Text>
                        </>)
                }
                <Loader visible={loading} />
            </View>
        </>
    )

}

export default AllActiveTrasctions;