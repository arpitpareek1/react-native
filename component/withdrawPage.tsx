import React, { useEffect, useState } from "react";
import { ScrollView, View, Image, Dimensions, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import CommonHeader from "./commonHeader";
import { UserObjType } from "../interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { backend_url, handle500Error, updateUserInfo } from "./helper";
import Loader from "./commons/Loader";


const WithDrawPage = ({ route }) => {
    const [loading, setLoading] = useState('');
    const [user, setUser] = useState<null | UserObjType>(null)
    const [userinfo, setUserInfo] = useState<{
        upi_id: null | string;
        bank_name: null | string;
        ifsc: null | string;
        cardInfo: null | string;
        amount: null | string;
    }>({ upi_id: null, bank_name: null, ifsc: null, cardInfo: null, amount: null })


    useEffect(() => {
        AsyncStorage.getItem("user").then((result) => {
            if (result) { setUser(JSON.parse(result)) }
        })
    }, [])

    const handleWithDrawClick = () => {
        setLoading("true")
        axios.post(backend_url + "/api/v1/transactions/sendWithdrawReq", {
            ...userinfo, email: user?.email
        }).then(async ({ data }) => {
            setLoading("")
            console.log("data", data);
            if (data.status) {
                let msg = "Withdrow Request send for "+userinfo.amount + " amount"
                Alert.alert("Alert!!", msg)
                Alert.prompt("Added", "Request send")
                updateUserInfo()
            }
        }).catch((error) => {
            console.log(error);
            
            handle500Error(error.message, Alert)
            setLoading("")
        }).finally(() => {
            setLoading("")
        })
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <CommonHeader title="WithDraw Points" previousPage="" />
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
                {/* <View style={{  justifyContent: 'flex-start', alignItems: 'flex-start', margin: responsiveWidth(5), width: Dimensions.get('window').width, flexDirection: 'column' }}> */}
                {/* <View style={{ flexDirection: 'column', marginBottom: responsiveWidth(1.5) }}> */}
                <View
                    style={{
                        flexDirection: 'column',
                        borderRadius: responsiveWidth(50),
                        borderColor: '#ccc',
                        // borderWidth: 1,
                        // paddingBottom: responsiveWidth(2.2),
                        marginBottom: responsiveWidth(1.5),
                        // width: responsiveWidth(89),
                        // border: responsiveWidth(3),
                    }}>
                    <TextInput
                        placeholder={'Enter Points'}
                        keyboardType={'phone-pad'}
                        onChangeText={(text) => { setUserInfo((prev) => { return { ...prev, amount: text } }); }}
                        value={userinfo.amount ?? ""}
                        maxLength={50}
                        placeholderTextColor="#7a9f86"
                        style={{ color: '#7a9f86', fontSize: responsiveFontSize(2), paddingHorizontal: responsiveWidth(4) }}
                    />
                    <TextInput
                        placeholder={'Upi Id'}
                        keyboardType={'default'}
                        onChangeText={(text) => { setUserInfo((prev) => { return { ...prev, upi_id: text } }); }}
                        value={userinfo.upi_id ?? ""}
                        maxLength={50}
                        placeholderTextColor="#7a9f86"
                        style={{ color: '#7a9f86', fontSize: responsiveFontSize(2), paddingHorizontal: responsiveWidth(4) }}
                    />
                    <TextInput
                        placeholder={'Bank Name'}
                        keyboardType={'default'}
                        onChangeText={(text) => { setUserInfo((prev) => { return { ...prev, bank_name: text } }); }}
                        value={userinfo.bank_name ?? ""}
                        maxLength={50}
                        placeholderTextColor="#7a9f86"
                        style={{ color: '#7a9f86', fontSize: responsiveFontSize(2), paddingHorizontal: responsiveWidth(4) }}
                    />
                    <TextInput
                        placeholder={'IEFSC Code'}
                        keyboardType={'default'}
                        onChangeText={(text) => { setUserInfo((prev) => { return { ...prev, ifsc: text } }); }}
                        value={userinfo.ifsc ?? ""}
                        maxLength={50}
                        placeholderTextColor="#7a9f86"
                        style={{ color: '#7a9f86', fontSize: responsiveFontSize(2), paddingHorizontal: responsiveWidth(4) }}
                    />
                    <TextInput
                        placeholder={'Account Number'}
                        keyboardType={'default'}
                        onChangeText={(text) => { setUserInfo((prev) => { return { ...prev, cardInfo: text } }); }}
                        value={userinfo.cardInfo ?? ""}
                        maxLength={50}
                        placeholderTextColor="#7a9f86"
                        style={{ color: '#7a9f86', fontSize: responsiveFontSize(2), paddingHorizontal: responsiveWidth(4) }}
                    />
                </View>
                {/* </View> */}

                <TouchableOpacity
                    onPress={() => { handleWithDrawClick() }}
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
                {/* </View> */}
            </ScrollView>
            <Loader visible={loading !== ""} />
        </GestureHandlerRootView>
    );
}

export default WithDrawPage