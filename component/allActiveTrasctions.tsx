import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { backend_url, handle500Error } from "./helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, ToastAndroid, View } from "react-native";
import Loader from "./commons/Loader";
import { Text } from "react-native-elements";
import CommonHeader from "./commonHeader";
import ProductItem from "./commons/productItem";
import { ProductType } from "../interfaces";

const AllActiveTrasctions = () => {
    const [loading, setLoading] = useState(false)
    const [transcutionInfo, setTranscutionInfo] = useState<null | {
        amount: number;
        product_name: string;
        transaction_id: string;
    }[]>(null)
    const [productsData, setProductsData] = useState<null | ProductType[]>(null)

    useEffect(() => {
        getData()
    }, [])


    function getImageUrlFromName(name:string){
        if(productsData){
          return (productsData.filter((product)=>product.title===name))[0].imageSource
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

    return (
        <>
            <CommonHeader title="My Transuctions" previousPage="" />
            <View>
                {
                    transcutionInfo && transcutionInfo.map((data, index) => (
                        <View key={index}>
                            <ProductItem
                                key={index}
                                imageSource={getImageUrlFromName(data.product_name)??""}
                                link={""}
                                price={(data.amount).toString()}
                                title={data.product_name}
                                transaction_id={data.transaction_id}
                            />
                            {/* <Text>
                                {data.amount}
                            </Text>
                            <Text>
                                {data.product_name}
                            </Text>
                            <Text>
                                {data.transaction_id}
                            </Text> */}
                        </View>
                    ))
                }
                {
                    !loading && transcutionInfo && transcutionInfo.length === 0 && (
                        <>
                            <Text>Looks like you have no transcutions</Text>
                        </>)
                }
                <View style={{
                    paddingTop: 10
                }}>
                </View>
            </View>
            <Loader visible={loading} />
        </>
    )

}

export default AllActiveTrasctions;