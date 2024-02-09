import React, { useState } from "react"
import { View, ScrollView, Image, Dimensions, Text, TouchableOpacity, Button, StyleSheet, Alert } from "react-native";
import CommonHeader from "./commonHeader";
import Loader from "./commons/Loader";
import axios from "axios";
import { backend_url, handle500Error } from "./helper";
import { UserObjType } from "../interfaces";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const CliamReward: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<null | UserObjType>(null)

    useFocusEffect(() => {
        AsyncStorage.getItem("user").then((result) => {
            if (result) { setUser(JSON.parse(result)) }
        })
    })

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
            <View>
                <CommonHeader title="Claim your reward" previousPage="" />
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.referImage}>
                            <Image
                                source={{
                                    uri: 'https://img.freepik.com/free-vector/customer-receiving-gifts-bonus-program-vector-illustration_74855-4778.jpg',
                                }}
                                style={{
                                    width: Dimensions.get('window').width / 2,
                                    height: Dimensions.get('window').width / 2,
                                }}
                            />
                        </View>
                        <View>
                            <Text style={{ color: 'black', padding: 20 }}>
                                Claim your Reward for today
                            </Text>
                        </View>
                        <View style={styles.referCodebar}>
                            <View style={styles.openQR}>
                                <Button
                                    title="Redeem Your Daily Earning"
                                    color={'#7a9f86'}
                                    onPress={() => {
                                        handleReedemButton()
                                    }}></Button>
                            </View>
                        </View>
                        <View
                            style={{
                                paddingTop: 50,
                                marginTop: 50,
                                borderTopColor: 'black',
                                borderTopWidth: 1,
                            }}>
                            <View>
                                <Text
                                    style={{
                                        color: 'black',
                                        textAlign: 'center',
                                        fontWeight: '500',
                                        fontSize: 15,
                                    }}>
                                    How Rewards Work
                                </Text>
                            </View>
                            <View style={{ gap: 10, paddingVertical: 20 }}>
                                <Text style={{ color: '#000', fontWeight: '400', fontSize: 14 }}>
                                    1. The products you buy all have an daily bonus point.
                                </Text>
                                <Text style={{ color: '#000', fontWeight: '400', fontSize: 14 }}>
                                    2. Ensure you claim every day.
                                </Text>
                                <Text style={{ color: '#000', fontWeight: '400', fontSize: 14 }}>
                                    3. Claim is available in every 24 hours.
                                </Text>
                                <Text style={{ color: '#000', fontWeight: '400', fontSize: 14 }}>
                                    4. You will only get points if you have buy any product.
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Loader visible={loading} />
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        paddingVertical: 50,
    },
    referImage: {},
    referCodebar: {
        flexDirection: 'row',
        gap: 10,
    },
    codeArea: {
        flexDirection: 'row',
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        paddingHorizontal: 15,
        gap: 50,
    },
    openQR: {
        padding: 10,
        width: 200
    },
    shareQrcode: {
        width: 250,
        height: 250,
    },
    qrcodeComponent: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        top: 0,
        alignItems: 'center',
        paddingTop: 100,
        backgroundColor: 'rgba(0,0,0,0.2)',
        zIndex: 1,
    },
    qrComponentChile: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        gap: 10,
        flexDirection: 'column',
    },
    qrclose: {
        color: 'white',
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 100,
        textAlign: 'center',
        fontWeight: '500',
        width: 100,
    },
});
export default CliamReward