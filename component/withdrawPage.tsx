import React, { useEffect, useState } from "react";
import { ScrollView, View, Image, Dimensions, TextInput, Text, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { responsiveWidth, responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import CommonHeader from "./commonHeader";
import { UserObjType } from "../interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { backend_url, handle500Error, updateUserInfo } from "./helper";
import Loader from "./commons/Loader";
import { Dialog } from "react-native-elements";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import bank from './assets/bank.png';
import phonepe from './assets/phonepe.png';
import googlepay from './assets/googlepay.png';
import paytm from './assets/paytm.png';
import { Dropdown } from 'react-native-element-dropdown';
import CustomButton from "./commons/CustomButton";

const WithDrawPage = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<null | UserObjType>(null)
    const [userinfo, setUserInfo] = useState<{
        upi_id: null | string;
        bank_name: null | string;
        ifsc: null | string;
        cardInfo: null | string;
        amount: null | string;
    }>({ upi_id: null, bank_name: null, ifsc: null, cardInfo: null, amount: null })
    const [value, setValue] = useState('');
    const data = [
        { label: `PhonePe (${user?.phone})`, value: 'phonepe' },
        { label: `GooglePay (${user?.phone})`, value: 'googlepay' },
        { label: `PayTM (${user?.phone})`, value: 'paytm' },
    ];
    const [valueError, setValueError] = useState('');
    const [amount, setAmount] = useState('');
    const [amountError, setAmountError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem("user").then((result) => {
            if (result) { setUser(JSON.parse(result)) }
        })
    }, [])

    const handleWithDrawClick = () => {
        setLoading(true)
        axios.post(backend_url + "/api/v1/transactions/sendWithdrawReq", {
            ...userinfo, email: user?.email
        }).then(async ({ data }) => {
            console.log("data", data);
            if (data.status) {
                let msg = "Withdrow Request send for " + userinfo.amount + " amount"
                Alert.alert("Alert!!", msg)
                Alert.prompt("Added", "Request send")
                updateUserInfo()
                navigation.naviagte("Home")
            }
        }).catch((error) => {
            console.log(error);
            handle500Error(error.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <SafeAreaView style={{ justifyContent: 'center' }}>
            <View style={{ backgroundColor: '#7a9f86', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: responsiveWidth(4.1) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: responsiveFontSize(2.8), color: 'white', fontWeight: '600', marginRight: responsiveWidth(15), alignSelf: 'center', width: responsiveWidth(40) }}>Withdraw Fund</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: responsiveFontSize(2), color: 'white' }}>Points {user?.money ?? 0}</Text>
                    </View>
                </View>
            </View>

            <View style={{ flexDirection: 'column', margin: responsiveWidth(5), gap: responsiveWidth(5) }}>
                <Text style={{ fontSize: responsiveFontSize(2.5), fontFamily: 'Roboto-Bold', color: '#333' }}>Payment Method</Text>
                <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Bank', {
                            responsiveWidth
                        });

                    }}
                        style={{ borderRadius: 10, borderWidth: 1, borderColor: '#ccc', flexDirection: 'column', alignItems: 'center', gap: responsiveWidth(1.5), padding: responsiveWidth(1.5), backgroundColor: '#fff' }}
                    >
                        <Image
                            source={bank}
                            style={{ width: responsiveWidth(16.9), height: responsiveHeight(7.9), borderRadius: 10, }}
                        />
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#333', fontFamily: 'Roboto-Bold' }}>Bank</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Phonepe', {
                            // title: route.params?.title,
                            // id: route.params?.id,
                        });

                    }}
                        style={{ borderRadius: 10, borderWidth: 1, borderColor: '#ccc', flexDirection: 'column', alignItems: 'center', gap: responsiveWidth(1.5), padding: responsiveWidth(1.5), backgroundColor: '#fff' }}
                    >
                        <Image
                            source={phonepe}
                            style={{ width: responsiveWidth(16.9), height: responsiveHeight(7.9), borderRadius: 10, }}
                        />
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#333', fontFamily: 'Roboto-Bold' }}>PhonePe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Googlepay', {
                            // title: route.params?.title,
                            // id: route.params?.id,
                        });

                    }}
                        style={{ borderRadius: 10, borderWidth: 1, borderColor: '#ccc', flexDirection: 'column', alignItems: 'center', gap: responsiveWidth(1.5), padding: responsiveWidth(1.5), backgroundColor: '#fff' }}
                    >
                        <Image
                            source={googlepay}
                            style={{ width: responsiveWidth(16.9), height: responsiveHeight(7.9), borderRadius: 10, }}
                        />
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#333', fontFamily: 'Roboto-Bold' }}>Google Pay</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Paytm', {
                            // title: route.params?.title,
                            // id: route.params?.id,
                        });

                    }}
                        style={{ borderRadius: 10, borderWidth: 1, borderColor: '#ccc', flexDirection: 'column', alignItems: 'center', gap: responsiveWidth(1.5), padding: responsiveWidth(1.5), backgroundColor: '#fff' }}
                    >
                        <Image
                            source={paytm}
                            style={{ width: responsiveWidth(16.9), height: responsiveHeight(7.9), borderRadius: 10, }}
                        />
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#333', fontFamily: 'Roboto-Bold' }}>PayTM</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'column', }}>
                    <Text style={{ fontFamily: 'Roboto-Bold', fontSize: responsiveFontSize(2.5), color: "#333", marginTop: responsiveWidth(1) }}>Withdraw Fund</Text>
                    <Dropdown
                        data={data}
                        placeholderStyle={{ color: '#333', fontSize: responsiveFontSize(2.2), fontFamily: 'Roboto-Bold', alignItems: 'center', textAlign: 'center' }}
                        placeholder='Select Payment Method'
                        labelField="label"
                        valueField="value"
                        value={value}
                        style={{ borderColor: "#ccc", borderWidth: 1, padding: responsiveWidth(2), backgroundColor: '#fff', borderRadius: 10, marginTop: responsiveWidth(5) }}
                        onChange={item => {
                            setValue(item.value);
                        }}
                        selectedTextStyle={{ color: "#333", fontFamily: 'Roboto-Bold', fontSize: responsiveFontSize(2.5) }}
                        activeColor='#ccc'
                        itemTextStyle={{ color: "#333" }}
                    />
                    <Text style={{ color: 'red', fontSize: responsiveFontSize(1.6), fontFamily: 'Roboto-Regular', marginLeft: responsiveWidth(3), flexWrap: 'wrap', width: responsiveWidth(50), marginTop: responsiveWidth(2), }}>{valueError}</Text>
                    <View style={{ flexDirection: 'row', gap: responsiveWidth(3), marginTop: responsiveWidth(2) }}>
                        <View style={{ flexDirection: 'column', gap: responsiveWidth(1.5), flexWrap: 'wrap', width: responsiveWidth(45), }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    borderRadius: 10,
                                    borderColor: '#ccc',
                                    // borderBottomWidth: 1,
                                    borderWidth: 1,
                                    paddingBottom: responsiveWidth(2.2),
                                    // marginBottom: 4,
                                    width: responsiveWidth(45),
                                    backgroundColor: '#fff',
                                }}>
                                <TextInput
                                    placeholder={'Enter Amount'}
                                    keyboardType={'phone-pad'}
                                    onChangeText={(text) => { setAmount(text); }}
                                    value={amount}
                                    maxLength={5}
                                    placeholderTextColor="#666"
                                    style={{ flex: 1, paddingVertical: responsiveWidth(0.5), color: '#666', fontSize: responsiveFontSize(2.2), paddingHorizontal: responsiveWidth(4.1), paddingTop: responsiveWidth(2.2), textAlign: 'center' }}
                                // editable={false}
                                />
                            </View>
                            <Text style={{ color: 'red', fontSize: responsiveFontSize(1.6), fontFamily: 'Roboto-Regular', marginLeft: responsiveWidth(1), flexWrap: 'wrap', width: responsiveWidth(65), }}>{amountError}</Text>
                        </View>
                        <CustomButton
                            label={' Submit Request'}
                            onPress={() => {
                                handleWithDrawClick()
                            }}
                        />
                    </View>
                </View>
            </View>
            <Dialog isVisible={loading} onBackdropPress={() => setLoading(true)}>
                <Dialog.Loading />
            </Dialog>
            <Dialog
                isVisible={success}
                onBackdropPress={() => { setSuccess(true); }}
                style={{ backgroundColor: '#333' }}
            >
                <Dialog.Title title="Request Sent!" titleStyle={{ color: '#333', }} />
                <Text style={{ color: '#333' }}>Amount will be credited in 24hr's in your account.</Text>
                <Dialog.Actions>
                    <Dialog.Button
                        title="OK"
                        onPress={() => {
                            setSuccess(false);
                            setAmount('');
                            setValue('');
                        }}
                        titleStyle={{ color: 'green' }}
                    />
                </Dialog.Actions>
            </Dialog>
        </SafeAreaView >
    );
};



export default WithDrawPage