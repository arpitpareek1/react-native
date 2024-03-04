import React, { useCallback, useEffect, useState } from "react";
import { View, Image, TextInput, Text, TouchableOpacity, Alert, SafeAreaView, ToastAndroid, ScrollView } from "react-native";
import { responsiveWidth, responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import { UserObjType } from "../interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { backend_url, handle500Error, updateUserInfo } from "./helper";
import { Dialog } from "react-native-elements";
import bank from './assets/bank.png';
import phonepe from './assets/phonepe.png';
import googlepay from './assets/googlepay.png';
import paytm from './assets/paytm.png';
import { Dropdown } from 'react-native-element-dropdown';
import CustomButton from "./commons/CustomButton";
import Loader from "./commons/Loader";
import { useFocusEffect } from "@react-navigation/native";

const WithDrawPage = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<null | UserObjType>(null)
    const [userinfo, setUserInfo] = useState<{
        upi_id: null | string;
        bank_name: null | string;
        ifsc: null | string;
        cardInfo: null | string;
        amount: null | number;
    }>({ upi_id: null, bank_name: null, ifsc: null, cardInfo: null, amount: null })
    const [value, setValue] = useState('');
    const [bankInfo, setBankInfo] = useState<null | {
        accName: string;
        cardInfo: string;
        accNumber: string;
        ifsc: string;
        Branch: string;
        bank_name: string;
    }>(null)

    const [valueError, setValueError] = useState('');
    const [amount, setAmount] = useState('');
    const [amountError, setAmountError] = useState('');
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState<[] | { label: string, value: string }[]>([])
    const [withdrawLimit, setWithDrawLimit] = useState<null | number>(null)
    const [maxWithdrawLimit, setMaxWithDrawLimit] = useState<null | number>(null)
    const [withdrawMsg, setWithdrawMsg] = useState('')
    const [weekdays, setWeekDays] = useState('')


    const fullWeekdays = [
        { id: 1, name: 'Monday' },
        { id: 2, name: 'Tuesday' },
        { id: 3, name: 'Wednesday' },
        { id: 4, name: 'Thursday' },
        { id: 5, name: 'Friday' },
        { id: 6, name: 'Saturday' },
        { id: 7, name: 'Sunday' },
    ];


    useEffect(() => {
        getBankDataCallbackHook()
        AsyncStorage.getItem("user").then((result) => {
            if (result) {
                const userData = JSON.parse(result)
                setUser(userData)
            }
        })
        axios.get(backend_url + "/api/v1/settings/getAll").then(({ data }) => {
            console.log(data);
            if (data && data.length) {
                const limit = data.filter((setting: { key: string; }) => setting.key === "withdraw_limit")
                const message = data.filter((setting: { key: string; }) => setting.key === "Withdraw_info")
                const max_limit = data.filter((setting: { key: string; }) => setting.key === "maximum_withdraw_limit")
                const weekdays = data.filter((setting: { key: string; }) => setting.key === "withdraw_days")
                if (message.length) {
                    setWithdrawMsg(String(message[0].value))
                }
                if (weekdays.length) {
                    setWeekDays(weekdays[0].value)
                }
                if (max_limit.length) {
                    setMaxWithDrawLimit(Number(max_limit[0].value))
                }
                if (limit.length) {
                    setWithDrawLimit(Number(limit[0].value))
                } else {
                    ToastAndroid.showWithGravity(
                        "Failed to get UPI settings, Please Try to relaunch the app",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                }
            } else {
                ToastAndroid.showWithGravity(
                    "Failed to get UPI settings, Please Try to relaunch the app",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }
        }).catch((err) => {
            console.log(err);
            ToastAndroid.showWithGravity(
                "Failed to get UPI settings, Please Try to relaunch the app",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        })
        AsyncStorage.getItem("userBank").then((result) => {
            if (result) {
                const parsedInfo = JSON.parse(result)
                setBankInfo(parsedInfo)
            }
        })
        fetchBankInfo()
    }, [])


    const getBankDataCallbackHook = useCallback(() => {
        fetchBankInfo()
    }, [])

    async function fetchBankInfo() {
        try {
            const result = await AsyncStorage.getItem("withdrawInfo");
            if (result) {
                const parsedInfo = JSON.parse(result) as any[];
                const uniqueObjectsArray: any[] = [];
                parsedInfo.forEach((data) => {
                    const label = (data.source as string).toUpperCase() + "(" + data.value + ")";
                    uniqueObjectsArray.push({ label, value: data.value });
                });
                setData(uniqueObjectsArray);
            }
        } catch (error) {
            setData([]);
        }
    }

    const handleWithDrawClick = () => {
        if (!(JSON.parse(weekdays) as number[]).some((value) =>{
            return value === new Date().getDay() || (new Date().getDay() === 0 && value===7)
        })) {
            return ToastAndroid.showWithGravity(
                "Only withdraw on " + (JSON.parse(weekdays) as number[]).map((v) => fullWeekdays.filter((p)=>p.id===v)[0].name).join(", "),
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
        if (userinfo && userinfo.amount && (userinfo.upi_id || userinfo.cardInfo) && withdrawLimit && bankInfo && maxWithdrawLimit) {
            if (userinfo.amount < Number(withdrawLimit) || userinfo.amount > Number(maxWithdrawLimit)) {
                return ToastAndroid.showWithGravity(
                    "Can't withdraw lower then " + withdrawLimit + " and greater than " + maxWithdrawLimit,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }
            setLoading(true)
            axios.post(backend_url + "/api/v1/transactions/sendWithdrawReq", {
                ...userinfo, email: user?.email, ...bankInfo
            }).then(async ({ data }) => {
                console.log("data", data);
                if (data.status) {
                    setSuccess(true)
                    let msg = "Withdraw Request send for " + userinfo.amount + " amount"
                    Alert.alert("Alert!!", msg)
                    Alert.prompt("Added", "Request send")
                    updateUserInfo()
                    navigation.navigate("Home")
                } else {
                    if (data.message)
                        return ToastAndroid.showWithGravity(
                            data.message,
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER,
                        );
                }
            }).catch((error) => {
                console.log(error);
                handle500Error(error.message)
            }).finally(() => {
                setLoading(false)
            })

        } else {
            if (!userinfo.amount) {
                return ToastAndroid.showWithGravity(
                    "Please Fill the Amount.",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }
            if (!userinfo.upi_id) {
                return ToastAndroid.showWithGravity(
                    "Please Select a UPI Payment Method as well",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }
            console.log("bankInfo", bankInfo, "userinfo.cardInfo", userinfo.cardInfo);

            if (!userinfo.cardInfo || !bankInfo) {
                return ToastAndroid.showWithGravity(
                    "Please Fill your bank information.",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }

            ToastAndroid.showWithGravity(
                "Please fill valid values.",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
    }

    return (
        <>
            <ScrollView>

                <SafeAreaView style={{ justifyContent: 'center' }}>
                    <View style={{ backgroundColor: '#7a9f86', flexDirection: 'row', alignItems: 'center', padding: responsiveWidth(4.1) }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: responsiveFontSize(2.8), color: 'white', fontWeight: '600', marginRight: responsiveWidth(15), alignSelf: 'center', width: responsiveWidth(40) }}>Withdraw Fund</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 2 }}>
                                <Text style={{ fontSize: responsiveFontSize(2), color: 'white', justifyContent: "flex-end", marginLeft: 60 }}>₹ {user?.money ?? 0}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'column', margin: responsiveWidth(5), gap: responsiveWidth(5) }}>
                        <Text style={{ fontSize: responsiveFontSize(2.5), fontFamily: 'Roboto-Bold', color: '#333' }}>Payment Method</Text>
                        <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Bank');
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
                                navigation.navigate('Phonepe');

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
                                navigation.navigate('Googlepay');

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
                                navigation.navigate('Paytm');

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
                                    if (item.label.includes("bank")) {
                                        setUserInfo((prev) => ({ ...prev, cardInfo: item.value }))
                                    } else {
                                        setUserInfo((prev) => ({ ...prev, upi_id: item.value }))
                                    }
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
                                            borderWidth: 1,
                                            paddingBottom: responsiveWidth(2.2),
                                            width: responsiveWidth(45),
                                            backgroundColor: '#fff',
                                        }}>
                                        <TextInput
                                            placeholder={'Enter Amount'}
                                            keyboardType={'phone-pad'}
                                            onChangeText={(text) => {
                                                setAmount(text);
                                                setUserInfo((prev) => ({
                                                    ...prev, amount: Number(text)
                                                }))
                                            }}
                                            value={amount}
                                            maxLength={5}
                                            placeholderTextColor="#666"
                                            style={{ flex: 1, paddingVertical: responsiveWidth(0.5), color: '#666', fontSize: responsiveFontSize(2.2), paddingHorizontal: responsiveWidth(4.1), paddingTop: responsiveWidth(2.2), textAlign: 'center' }}
                                            editable={true}
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
                        {withdrawMsg && <View>
                            <Text style={{
                                color: "#333",
                                fontFamily: 'Roboto-Bold',
                                fontSize: responsiveFontSize(2.2)
                            }}>
                                {withdrawMsg}
                            </Text>
                        </View>}
                        {weekdays && <View>
                            <Text style={{
                                color: "#333",
                                fontFamily: 'Roboto-Bold',
                                fontSize: responsiveFontSize(2.2)
                            }}>
                                You can only request for withdraw on {(JSON.parse(weekdays) as number[]).map((v) => fullWeekdays.filter((p)=>p.id===v)[0].name).join(", ")}
                            </Text>
                        </View>}
                        <TouchableOpacity onPress={() => {
                            fetchBankInfo()
                        }}>
                            <Text style={{
                                color: "#fefefe",
                                borderColor: "#7a9f86",
                                textAlign: "center",
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: "#7a9f86",
                                borderWidth: 1,
                                borderRadius: 14,
                                padding: 16,
                                fontWeight: 'bold',
                            }}>Refresh Payment details</Text>
                        </TouchableOpacity>
                    </View>
                    <Dialog isVisible={loading} onBackdropPress={() => setLoading(true)}>
                        <Dialog.Loading />
                    </Dialog>
                    <Dialog
                        isVisible={success}
                        onBackdropPress={() => { setSuccess(false); }}
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
            </ScrollView>

            <Loader visible={withdrawLimit === null}></Loader>
        </>

    );
};



export default WithDrawPage