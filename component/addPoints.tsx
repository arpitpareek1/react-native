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

const AddFundScreen = ({ route }) => {
    const [points, setPoints] = useState('');
    const [pointsError] = useState('');
    const [user, setUser] = useState<null | UserObjType>(null)

    useEffect(() => {
        if (route.params && route.params.pointsToAdd) {
            setPoints(route.params.pointsToAdd)
        }
        AsyncStorage.getItem("user").then((result) => {
            if (result) { setUser(JSON.parse(result)) }
        })
    }, [])

    const handleAddPoints = () => {
        if (points && Number(points) !== 0) {
            RNUpiPayment.initializePayment(
                {
                    vpa: 'shreeshyamenterprise.930835@hdfc',
                    payeeName: 'Rio Tinto',
                    amount: 1,
                    transactionRef: 'aasf-332-aoei-fn-iiO',
                    transactionNote: 'Rio Tinto App',
                },
                () => {
                    axios.post(backend_url + "/api/v1/transactions/addMoneyToWallet", {
                        email: user?.email, amount: points
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
                },
                (err) => {
                    console.log("err", err);
                    ToastAndroid.showWithGravity(
                        "Looks Like payment has cancel from your side.",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                      );
                },
            );
        }else {
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
        </GestureHandlerRootView>
    );
};

export default AddFundScreen;