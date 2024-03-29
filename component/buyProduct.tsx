import React, { useEffect, useState } from "react";
import { ScrollView, View, Dimensions, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import CommonHeader from "./commonHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserObjType } from "../interfaces";
import Loader from "./commons/Loader";
import axios from "axios";
import { backend_url, handle500Error, updateUserInfo } from "./helper";

const BuyProductPage = ({ route, navigation }) => {
    const { imageSource, title, price, dailyIncome, validityPeriod, isHot } = route.params;
    const [points, setPoints] = useState('');
    const [user, setUser] = useState<null | UserObjType>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        AsyncStorage.getItem("user").then((result) => {
            if (result) { setUser(JSON.parse(result)) }
        })
    }, [])

    function generateRandomString() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }
        return randomString;
    }

    const handleOrderClick = () => {
        setLoading(true)
        if (user?.email && price && title) {
            axios.post(backend_url + "/api/v1/transactions/canUserBuyProduct", {
                email: user.email,
                title
            }).then(({ data }) => {
                if (data && data.success) {
                    axios.post(backend_url + "/api/v1/transactions/sendTransactionReq",
                        {
                            email: user.email,
                            amount: price,
                            transaction_id: generateRandomString(),
                            product_name: title,
                            payment_mode: "Recharge"
                        }
                    ).then(({ data }) => {
                        console.log(data);
                        if (data && data.status) {
                            Alert.alert("Success", "Your order is placed!!");
                            updateUserInfo()
                            navigation.navigate("Home");
                        } else {
                            setLoading(false)
                            Alert.alert("Failed", data.message)
                        }
                    }).catch((e) => {
                        console.log("err", e);
                        handle500Error(e.message)
                    }).finally(() => {
                        setLoading(false)
                    })
                } else {
                    setLoading(false)
                    Alert.alert("Error", data.message)
                    navigation.navigate("Home");
                }
            }).catch((err) => {
                handle500Error(err.message)
            }).finally(() => {
                setLoading(false)
            });
        }
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <CommonHeader title="Order Product" previousPage="" />
            <ScrollView>
                <View style={{ flex: 1, margin: responsiveWidth(5), width: Dimensions.get('window').width - 30, flexDirection: 'column' }}>
                    <View style={styles.postBody}>
                        <Image
                            source={{
                                uri: imageSource,
                            }}
                            style={styles.image}
                        />
                    </View>
                    <View style={{ ...styles.goodinfo, ...styles.appContent }}>
                        <Text style={styles.title}>{title}</Text>
                        <View style={styles.text}>
                            <View style={styles.details}>
                                <View style={styles.detailsText}>
                                    <Text style={styles.strong}>Price </Text>
                                    <Text style={styles.detailsItem}> {price} Rs</Text>
                                </View>
                                {!isHot && <View style={styles.detailsText}>
                                    <Text style={styles.strong}>Daily income     </Text>
                                    <Text style={styles.detailsItem}> {dailyIncome} Rs</Text>
                                </View>}
                                <View style={styles.detailsText}>
                                    <Text style={styles.strong}>Validity period </Text>
                                    <Text style={styles.detailsItem}> {validityPeriod} Days</Text>
                                </View>
                                <View style={styles.detailsText}>
                                    <Text style={styles.strong}>Total revenue </Text>
                                    <Text style={styles.detailsItem}> {validityPeriod * dailyIncome} Rs</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => { handleOrderClick() }}
                        disabled={loading}
                        style={{
                            backgroundColor: '#7a9f86',
                            padding: responsiveWidth(4.1),
                            borderRadius: 60,
                            marginBottom: responsiveWidth(2),
                            width: responsiveWidth(90),
                            marginTop: 10
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontWeight: '700',
                                fontSize: responsiveFontSize(2.2),
                                color: '#fff',
                            }}>
                            Order
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Loader visible={loading} />
        </GestureHandlerRootView>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderTopColor: '#97b4a1',
        borderTopWidth: 1,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    leftContent: {
        flex: 1,
    },
    titleColor: {
        color: '#000',
        marginBottom: 0,
        flexDirection: 'row',
        gap: 10,
    },
    strikethrough: {
        color: '#567660',
        fontWeight: '500',
        fontSize: 16
    },
    buyButton: {
        backgroundColor: '#60856c',
        color: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 5,
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    btn: {
        alignItems: 'flex-end',
    },
    appCapsule: {
        backgroundColor: 'white',
        padding: 15,
        flexDirection: 'column',
        gap: 20,
    },
    postBody: {
        width: '100%',
        height: 300,
    },
    image: {
        height: 300,
    },
    appContent: {
        paddingVertical: 20,
    },
    goodinfo: {
        backgroundColor: '#F5F7F9',
        borderRadius: 9,
        color: 'black',
        padding: 15,
    },
    titleContainer: {
        // height: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        color: 'black',
    },
    text: {
        marginTop: 2,
    },
    details: {
        paddingVertical: 10,
        gap: 5,
    },
    detailsText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    strong: {
        fontWeight: '400',
        color: 'black',
    },
    detailsItem: {
        color: 'black',
        fontWeight: '500',
    },
    wallet: {
        backgroundColor: '#F5F7F9',
        borderRadius: 10,
        color: 'black',
        padding: 15,
        marginTop: 20,
    },
    walletTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        color: 'black',
    },
    tit: {
        paddingTop: 10,
        flexDirection: 'row',
        gap: 10,
    },
    walletText: {
        color: 'black',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    gooddesc: {
        backgroundColor: '#F5F7F9',
        borderRadius: 10,
        color: 'black',
        padding: 15,
        marginTop: 20,
    },
    detailsTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        color: 'black',
    },
    cobn: {
        // Add your content inside cobn
    },
});

export default BuyProductPage