import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { Dialog } from 'react-native-elements';
import CommonHeader from './commonHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateBankInfo } from './helper';

const Bank = ({ navigation }:any) => {
    const [accNumber, setAccNumber] = useState('');
    const [accNumberError, setAccNumberError] = useState('');
    const [accName, setAccName] = useState('');
    const [accNameError, setAccNameError] = useState('');
    const [accConfNumber, setAccConfNumber] = useState('');
    const [accConfNumberError, setAccConfNumberError] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [ifscCodeError, setIfscCodeError] = useState('');
    const [bankName, setBankName] = useState('');
    const [bankNameError, setBankNameError] = useState('');
    const [Branch, setBranch] = useState('');
    const [BranchError, setBranchError] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        AsyncStorage.getItem("userBank").then((value) => {
            if (value) {
                const data = JSON.parse(value);
                setAccName(() => data.accName ? data.accName : "");
                setAccConfNumber(() => data.cardInfo ? data.cardInfo : "");
                setAccNumber(() => data.accNumber ? data.accNumber : "");
                setIfscCode(() => data.ifsc ? data.ifsc : "");
                setBranch(() => data.Branch ? data.Branch : "");
                setBankName(() => data.bank_name ? data.bank_name : "");
            }
        });
    }, []);

    useEffect(() => {
        if (accName.length > 3) {
            setAccNameError('');
        }
        if (accNumber.length > 14) {
            setAccNumberError('');
        }
        if (accConfNumber === accNumber) {
            setAccConfNumberError('');
        }
        if (ifscCode.length === 11) {
            setIfscCodeError('');
        }
        if (bankName.length > 3) {
            setBankNameError('');
        }
        if (Branch.length === 10) {
            setBranchError('');
        }
    }, [accName, accConfNumber, accNumber, ifscCode, Branch, bankName]);

    const validateRiquired = (value: string) => {
        if (!value.trim()) {
            return 'This is required';
        }
        return '';
    };

    const validateAccNameField = () => {
        const error = validateRiquired(accName) || accName.length < 3 ? 'Invalid name' : '';
        setAccNameError(error);
        return !error;
    };

    const validateAccNumberField = () => {
        const error = validateRiquired(accNumber);
        setAccNumberError(error);
        return !error;
    };

    const validateAccConfNumberField = () => {
        const error = validateRiquired(accConfNumber) || accConfNumber !== accNumber ? 'Account numbers do not match' : '';
        setAccConfNumberError(error);
        return !error;
    };

    const validateIfscField = () => {
        const error = validateRiquired(ifscCode) || ifscCode.length !== 11 ? 'Invalid IFSC code, IFSC should be 11 digits' : '';
        setIfscCodeError(error);
        return !error;
    };

    const validateBankNameField = () => {
        const error = validateRiquired(bankName) || bankName.length < 3 ? 'Invalid bank name' : '';
        setBankNameError(error);
        return !error;
    };

    const validateBranchField = () => {
        const error = validateRiquired(Branch) || Branch.length < 3 ? 'Invalid branch address' : '';
        setBranchError(error);
        return !error;
    };

    const handleProceed = async () => {
        if (!validateAccNameField() || !validateAccNumberField() || !validateAccConfNumberField() || !validateIfscField() || !validateBankNameField() || !validateBranchField()) {
            console.log('Error');
            return;

        } else {
            setSuccess(true);
            const data = { accName, cardInfo: accConfNumber, accNumber, ifsc: ifscCode, Branch, bank_name: bankName }
            await AsyncStorage.setItem("userBank", JSON.stringify(data))
            updateBankInfo({
                source: "bank",
                value: accNumber
            }).then(() => {
                navigation.navigate("WithDrawPage")
            })
        }
    };

    return (
        <ScrollView>
            <CommonHeader title='Update Bank info' previousPage='' />
            <View style={{ flexDirection: 'column', margin: responsiveWidth(8), gap: responsiveWidth(5), }}>
                <View style={{ flexDirection: 'column', gap: responsiveWidth(0.5) }}>
                    <View style={{ flexDirection: 'column', gap: responsiveWidth(1.5), flexWrap: 'wrap', width: responsiveWidth(82) }}>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: responsiveFontSize(2.2), color: "#333", marginLeft: responsiveWidth(1.5) }}>Account Holder Name</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderRadius: 50,
                                borderColor: '#ccc',
                                borderWidth: 1,
                                paddingBottom: responsiveWidth(2.2),
                                alignItems: 'center',
                                width: responsiveWidth(82),
                                backgroundColor: '#fff',
                            }}>
                            <TextInput
                                placeholder={'Enter your name'}
                                onChangeText={(text) => { setAccName(text); }}
                                value={accName}
                                maxLength={25}
                                placeholderTextColor="#666"
                                style={{ flex: 1, paddingVertical: responsiveWidth(0.5), color: '#666', fontSize: responsiveFontSize(2), paddingHorizontal: responsiveWidth(4.1), paddingTop: responsiveWidth(2.2), fontFamily: 'Roboto-Bold' }}
                            />
                        </View>
                        <Text style={{ color: 'red', fontSize: responsiveFontSize(1.7), fontFamily: 'Roboto-Regular', marginLeft: responsiveWidth(3), flexWrap: 'wrap', width: responsiveWidth(45), }}>{accNameError}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', gap: responsiveWidth(1.5), flexWrap: 'wrap', width: responsiveWidth(82) }}>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: responsiveFontSize(2.2), color: "#333", marginLeft: responsiveWidth(1.5) }}>Account Number</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderRadius: 50,
                                borderColor: '#ccc',
                                borderWidth: 1,
                                paddingBottom: responsiveWidth(2.2),
                                alignItems: 'center',
                                width: responsiveWidth(82),
                                backgroundColor: '#fff',
                            }}>
                            <TextInput
                                placeholder={'Enter Your Account Number'}
                                keyboardType={'phone-pad'}
                                onChangeText={(text) => { setAccNumber(text); }}
                                value={accNumber}
                                maxLength={16}
                                placeholderTextColor="#666"
                                style={{ flex: 1, paddingVertical: responsiveWidth(0.5), color: '#666', fontSize: responsiveFontSize(2), paddingHorizontal: responsiveWidth(4.1), paddingTop: responsiveWidth(2.2), fontFamily: 'Roboto-Bold' }}
                            />
                        </View>
                        <Text style={{ color: 'red', fontSize: responsiveFontSize(1.7), fontFamily: 'Roboto-Regular', marginLeft: responsiveWidth(3), flexWrap: 'wrap', width: responsiveWidth(45), }}>{accNumberError}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', gap: responsiveWidth(1.5), flexWrap: 'wrap', width: responsiveWidth(82) }}>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: responsiveFontSize(2.2), color: "#333", marginLeft: responsiveWidth(1.5) }}>Confirm Account Number</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderRadius: 50,
                                borderColor: '#ccc',
                                borderWidth: 1,
                                paddingBottom: responsiveWidth(2.2),
                                alignItems: 'center',
                                width: responsiveWidth(82),
                                backgroundColor: '#fff',
                            }}>
                            <TextInput
                                placeholder={'Confirm Your Account Number'}
                                keyboardType={'phone-pad'}
                                onChangeText={(text) => { setAccConfNumber(text); }}
                                value={accConfNumber}
                                maxLength={16}
                                placeholderTextColor="#666"
                                style={{ flex: 1, paddingVertical: responsiveWidth(0.5), color: '#666', fontSize: responsiveFontSize(2), paddingHorizontal: responsiveWidth(4.1), paddingTop: responsiveWidth(2.2), fontFamily: 'Roboto-Bold' }}
                            />
                        </View>
                        <Text style={{ color: 'red', fontSize: responsiveFontSize(1.7), fontFamily: 'Roboto-Regular', marginLeft: responsiveWidth(3), flexWrap: 'wrap', width: responsiveWidth(45), }}>{accConfNumberError}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', gap: responsiveWidth(1.5), flexWrap: 'wrap', width: responsiveWidth(82) }}>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: responsiveFontSize(2.2), color: "#333", marginLeft: responsiveWidth(1.5) }}>IFSC Code</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderRadius: 50,
                                borderColor: '#ccc',
                                borderWidth: 1,
                                paddingBottom: responsiveWidth(2.2),
                                alignItems: 'center',
                                width: responsiveWidth(82),
                                backgroundColor: '#fff',
                            }}>
                            <TextInput
                                placeholder={'Enter IFSC Code'}
                                onChangeText={(text) => { setIfscCode(text); }}
                                value={ifscCode}
                                maxLength={11}
                                placeholderTextColor="#666"
                                style={{ flex: 1, paddingVertical: responsiveWidth(0.5), color: '#666', fontSize: responsiveFontSize(2), paddingHorizontal: responsiveWidth(4.1), paddingTop: responsiveWidth(2.2), fontFamily: 'Roboto-Bold' }}
                            />
                        </View>
                        <Text style={{ color: 'red', fontSize: responsiveFontSize(1.7), fontFamily: 'Roboto-Regular', marginLeft: responsiveWidth(3), flexWrap: 'wrap', width: responsiveWidth(45), }}>{ifscCodeError}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', gap: responsiveWidth(1.5), flexWrap: 'wrap', width: responsiveWidth(82) }}>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: responsiveFontSize(2.2), color: "#333", marginLeft: responsiveWidth(1.5) }}>Bank Name</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderRadius: 50,
                                borderColor: '#ccc',
                                borderWidth: 1,
                                paddingBottom: responsiveWidth(2.2),
                                alignItems: 'center',
                                width: responsiveWidth(82),
                                backgroundColor: '#fff',
                            }}>
                            <TextInput
                                placeholder={'Enter Bank Name'}
                                onChangeText={(text) => { setBankName(text); }}
                                value={bankName}
                                maxLength={25}
                                placeholderTextColor="#666"
                                style={{ flex: 1, paddingVertical: responsiveWidth(0.5), color: '#666', fontSize: responsiveFontSize(2), paddingHorizontal: responsiveWidth(4.1), paddingTop: responsiveWidth(2.2), fontFamily: 'Roboto-Bold' }}
                            />
                        </View>
                        <Text style={{ color: 'red', fontSize: responsiveFontSize(1.7), fontFamily: 'Roboto-Regular', marginLeft: responsiveWidth(3), flexWrap: 'wrap', width: responsiveWidth(45), }}>{bankNameError}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', gap: responsiveWidth(1.5), flexWrap: 'wrap', width: responsiveWidth(82) }}>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: responsiveFontSize(2.2), color: "#333", marginLeft: responsiveWidth(1.5) }}>Phone number</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderRadius: 50,
                                borderColor: '#ccc',
                                // borderBottomWidth: 1,
                                borderWidth: 1,
                                paddingBottom: responsiveWidth(2.2),
                                // marginBottom: 4,
                                alignItems: 'center',
                                width: responsiveWidth(82),
                                backgroundColor: '#fff',
                                // border: 10,
                            }}>
                            <TextInput
                                placeholder={'Enter Phone number'}
                                keyboardType={'phone-pad'}
                                onChangeText={(text) => { setBranch(text); }}
                                value={Branch}
                                maxLength={10}
                                placeholderTextColor="#666"
                                style={{ flex: 1, paddingVertical: responsiveWidth(0.5), color: '#666', fontSize: responsiveFontSize(2), paddingHorizontal: responsiveWidth(4.1), paddingTop: responsiveWidth(2.2), fontFamily: 'Roboto-Bold' }}
                            // editable={false}
                            />
                        </View>
                        <Text style={{ color: 'red', fontSize: responsiveFontSize(1.7), fontFamily: 'Roboto-Regular', marginLeft: responsiveWidth(3), flexWrap: 'wrap', width: responsiveWidth(45), }}>{BranchError}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={() => { handleProceed(); }}
                            style={{
                                backgroundColor: '#7a9f86',
                                padding: responsiveWidth(4.1),
                                borderRadius: 50,
                                marginBottom: responsiveWidth(8),
                                width: responsiveWidth(85),
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontWeight: '700',
                                    fontSize: responsiveFontSize(1.9),
                                    color: '#fff',
                                    textTransform: 'uppercase',
                                }}>
                                Submit Request
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <Text style={{
                    color: 'black',
                    textAlign: "left"
                }}>
                    * CardHolder Name (5-30 characters).
                </Text>
                <Text style={{
                    color: 'black',
                    textAlign: "left"
                }}>
                    * IFSC is characters and the fifth digit is the number 0.
                </Text>
                <Text style={{
                    color: 'black',
                    textAlign: "left"
                }}>
                    * Mobile number should be 10 digits.
                </Text>
            </View>
            <Dialog
                isVisible={success}
                onBackdropPress={() => { setSuccess(true); }}
                style={{ backgroundColor: '#333' }}
            >
                <Dialog.Title title="Bank Details Saved" titleStyle={{ color: '#333', }} />
                <Text style={{ color: '#333' }}>Your Bank details request has been sent.</Text>
                <Dialog.Actions>
                    <Dialog.Button
                        title="OK"
                        onPress={() => {
                            navigation.navigate("profile")
                        }}
                        titleStyle={{ color: 'green' }}
                    />
                </Dialog.Actions>
            </Dialog>
        </ScrollView >

    )
}

export default Bank