import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import {
    responsiveFontSize,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useFocusEffect } from '@react-navigation/native';
import CommonHeader from './commonHeader';
import axios from 'axios';
import { backend_url, updateUserInfo } from './helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserObjType } from '../interfaces';

const AddFundScreen = ({ route }) => {
    const [points, setPoints] = useState('');
    const [pointsError] = useState('');
    const [user, setUser] = useState<null | UserObjType>(null)


    useFocusEffect(() => {
        if (route.params && route.params.pointsToAdd) {
            setPoints(route.params.pointsToAdd)
        }
        AsyncStorage.getItem("user").then((result) => {
            if (result) { setUser(JSON.parse(result)) }
        })
    })

    const handleAddPoints = () => {
        axios.post(backend_url + "/api/v1/transactions/addMoneyToWallet", {
            email: user?.email, amount: points
        }).then(async ({ data }) => {
            console.log("data", data);
            if (data.status) {
                let msg = points + " Added to your wallet"
                if (route.params && route.params.pointsToAdd) {
                    msg += ", Now you can place the order."
                }
                Alert.alert("Alert!!", msg)
                Alert.prompt("Added", "Points Added")
                updateUserInfo()
            }
        }).catch(console.log)
    }
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <CommonHeader title="Add Points" previousPage="" />
            <ScrollView>
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', margin: responsiveWidth(5), width: Dimensions.get('window').width, flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'column', marginBottom: pointsError ? responsiveWidth(3) : responsiveWidth(1.5) }}>
                        <Text style={{ fontSize: responsiveFontSize(2.5), color: '#7a9f86', marginBottom: responsiveWidth(3), fontWeight: 600 }}>Points</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderRadius: responsiveWidth(50),
                                borderColor: '#ccc',
                                borderWidth: 1,
                                paddingBottom: responsiveWidth(2.2),
                                marginBottom: responsiveWidth(1.5),
                                width: responsiveWidth(89),
                                border: responsiveWidth(3),
                            }}>
                            <TextInput
                                placeholder={'Enter Points'}
                                keyboardType={'phone-pad'}
                                onChangeText={(text) => { setPoints(text); }}
                                value={points}
                                maxLength={5}
                                placeholderTextColor="#7a9f86"
                                style={{ flex: 1, paddingVertical: responsiveWidth(0.7), color: '#7a9f86', fontSize: responsiveFontSize(2.2), paddingHorizontal: responsiveWidth(4.1), paddingTop: responsiveWidth(3) }}
                            />
                        </View>
                        <Text style={{ color: '#7a9f86', fontSize: responsiveFontSize(1.6), fontFamily: 'Roboto-Regular', marginLeft: responsiveWidth(3) }}>{pointsError}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => { handleAddPoints() }}
                        style={{
                            backgroundColor: '#7a9f86',
                            padding: responsiveWidth(4.1),
                            borderRadius: 60,
                            marginBottom: responsiveWidth(2),
                            width: responsiveWidth(90),
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontWeight: '700',
                                fontSize: responsiveFontSize(2.2),
                                color: '#fff',
                            }}>
                            Add Points
                        </Text>
                    </TouchableOpacity>
                    {route.params === undefined &&
                        <>
                            <Text style={{
                                fontSize: responsiveFontSize(1.6),
                                color: '#7a9f86',
                                marginBottom: responsiveWidth(3),
                                fontWeight: 600
                            }}>Select Points Amount</Text>
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
                                            padding: responsiveWidth(4.1),
                                            borderRadius: 30,
                                            paddingBottom: responsiveWidth(5),
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