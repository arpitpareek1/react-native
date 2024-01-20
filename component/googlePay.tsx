import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validatePhoneNumber } from './commons/validation';
import CommonHeader from './commonHeader';
import { updateBankInfo } from './helper';

const Googlepay = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    useEffect(() => {
        AsyncStorage.getItem("user").then((res) => {
            if (res) {
                setPhoneNumber(() => {
                    return JSON.parse(res).phone
                })
            }
        })
    }, [])
    const validatePhoneNumberField = () => {
        const error = validatePhoneNumber(phoneNumber);
        setPhoneNumberError(error);
        return !error;
    };
    const handleProceed = async () => {
        // Validate fields before proceeding
        if (!validatePhoneNumberField()) {
            console.log('save');
            // If any validation fails, return without proceeding
            return;
        } else {
            await updateBankInfo({
                source: "GooglePay",
                value: phoneNumber
            })
            navigation.navigate("profile")
        }
    }

    return (
        <SafeAreaView style={{ justifyContent: 'center' }}>
            <CommonHeader title='PhonePe Info' previousPage='' />
            <View style={{ backgroundColor: '#fff', flexDirection: 'column', margin: responsiveWidth(5), gap: responsiveWidth(5), padding: responsiveWidth(5), borderRadius: 10 }}>
                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: responsiveFontSize(2.2), color: "#333", marginTop: 10 }}>Mobile Number</Text>
                <View style={{ flexDirection: 'column', gap: responsiveWidth(3) }}>
                    <View style={{ flexDirection: 'column', gap: responsiveWidth(1), flexWrap: 'wrap', width: responsiveWidth(45), }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderRadius: 50,
                                borderColor: '#ccc',
                                // borderBottomWidth: 1,
                                borderWidth: 1,
                                paddingBottom: responsiveWidth(2),
                                // marginBottom: 4,
                                width: responsiveWidth(79),
                                backgroundColor: '#fff',
                                border: 10,
                            }}>
                            <TextInput
                                placeholder={'Enter Number'}
                                keyboardType={'phone-pad'}
                                onChangeText={(text) => { setPhoneNumber(text); }}
                                value={phoneNumber}
                                maxLength={10}
                                placeholderTextColor="#666"
                                style={{ flex: 1, paddingVertical: responsiveWidth(1), color: '#666', fontSize: responsiveFontSize(2.2), paddingHorizontal: responsiveWidth(4.1), paddingTop: responsiveWidth(2), fontFamily: 'Roboto-Bold' }}
                                editable={true}
                            />
                        </View>
                        <Text style={{ color: 'red', fontSize: responsiveFontSize(1.6), fontFamily: 'Roboto-Regular', marginLeft: responsiveWidth(3), flexWrap: 'wrap', width: responsiveWidth(45), }}>{phoneNumberError}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={() => { handleProceed(); }}
                            style={{
                                backgroundColor: '#7a9f86',
                                padding: responsiveWidth(4.1),
                                borderRadius: 50,
                                marginBottom: responsiveWidth(8),
                                width: responsiveWidth(42),
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
            </View>
        </SafeAreaView>
    )
}

export default Googlepay