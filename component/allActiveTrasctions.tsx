import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { backend_url } from "./helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import Loader from "./commons/Loader";
import { Text } from "react-native-elements";

const AllActiveTrasctions = () => {
    const [loading, setLoading] = useState(false)
    const [transcutionInfo, setTranscutionInfo] = useState<null | any>(null)

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        console.log("kgdhfjjfh");
        setLoading(true)
        AsyncStorage.getItem("user").then((result) => {
            if (result) {
                const user = JSON.parse(result)
                console.log("user", user);

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
                }).catch(console.log).finally(() => {
                    setLoading(false)
                })
            }
        })
    }

    return (
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
            <Loader visible={loading} />
        </View>
    )

}

export default AllActiveTrasctions;