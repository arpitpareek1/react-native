import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import InputField from './commons/InputField';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from './commons/CustomButton';
import Loader from './commons/Loader';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import axios, { Axios } from 'axios';
import { backend_url } from './helper';
import CommonHeader from './commonHeader';

const RegisterScreen = ({ navigation }) => {
  const [isLoadingGlobal, setIsLoadingGlobal] = useState(false);
  const [error, setIsError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [address, setAddress] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [verification, setVerification] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [password, setPassword] = useState('');
  const [refral_code, setReferCode] = useState('');
  const [btnLoading, setBtnLoading] = useState(false)
  const [showButton, setShowButton] = useState(false);

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = password => {
    return password.length >= 6;
  };

  const validatePhone = phone => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  async function HandleSignUp() {
    try {
      if (!fullName) {
        setIsError('Please enter your full name.');
      } else if (!emailId) {
        setIsError('Please enter your email address.');
      } else if (!validateEmail(emailId)) {
        setIsError('Please enter a valid email address.');
      } else if (!password) {
        setIsError('Please enter a password.');
      } else if (!validatePassword(password)) {
        setIsError('Password must be at least 8 characters long and contain both letters and numbers.');
      } else if (!phoneNumber) {
        setIsError('Please enter your phone number.');
      } else if (!validatePhone(phoneNumber) && phoneNumber.length !== 10) {
        setIsError('Please enter a valid phone number.');
      } else if (!address) {
        setIsError('Please enter your address.');
      } else if (!verification) {
        setIsError('Please verify your number.');
      } else {
        setIsError("")
        setIsLoadingGlobal(true);
        axios
          .post(backend_url + '/api/v1/auth/register', {
            name: fullName,
            email: emailId,
            password,
            phone: phoneNumber,
            address: address,
            userReferCode: refral_code,
          })
          .then(({ data }) => {
            setIsLoadingGlobal(false);
            if (data.user) {
              AsyncStorage.setItem('user', JSON.stringify(data.user), () => {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Home" },],
                  })
                );
              });
            } else {
              if (data.massage) {
                Alert.alert('Alert', data.massage);
              }
            }
          })
          .catch(err => {
            setIsLoadingGlobal(false);
            console.log(err);
            Alert.alert('Alert', err.message ?? "Something went wrong");
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSendOtp() {
    if (!phoneNumber || !validatePhone(phoneNumber) && phoneNumber.length !== 10) {
      setIsError('Please enter your phone number.');
    } else {
      setBtnLoading(true)
      axios.post(backend_url + "/api/v1/auth/sent-otp", {
        phoneNumber
      }).then(({ data }) => {
        console.log("data", data);
        if (data && data.status) {
          setShowOtp(true)
        } else {
          ToastAndroid.showWithGravity(
            "Failed to send OTP.",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      }).catch(() => {
        ToastAndroid.showWithGravity(
          "Failed to send OTP.",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }).finally(() => {
        setBtnLoading(false)
        setShowButton(false)
        setTimeout(() => {
          setShowButton(true);
        }, 60000);
      })
    }
  }
  async function handleVerifyOtp() {
    if (!phoneNumber || !validatePhone(phoneNumber) && phoneNumber.length !== 10) {
      setIsError('Please enter your phone number.');
    } else if (!otpValue && otpValue.length !== 6) {
      setIsError('Please enter valid OTP.');
    } else {
      setBtnLoading(true)
      axios.post(backend_url + "/api/v1/auth/verifyOtp", {
        phoneNumber,
        code: otpValue
      }).then(({ data }) => {
        console.log(data);
        if (data && data.verification && data.verification.valid) {
          setVerification(true)
          ToastAndroid.showWithGravity(
            "OTP is verified, Please continue sign up",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          ToastAndroid.showWithGravity(
            "Failed to send OTP.",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      }).catch(() => {
        ToastAndroid.showWithGravity(
          "Failed to send OTP.",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }).finally(() => setBtnLoading(false))
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <CommonHeader title="Sign up" previousPage="" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: responsiveWidth(7) }}>
        <Text
          style={{
            paddingTop: 20,
            fontFamily: 'Roboto-Medium',
            fontSize: responsiveFontSize(3.8),
            fontWeight: '500',
            color: '#333',
            marginBottom: responsiveWidth(8),
          }}>
          Register
        </Text>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <InputField
            label={'Full Name'}
            onChangeText={text => {
              setFullName(text);
            }}
            value={fullName}
            maxLength={25}
            icon={
              <Ionicons
                name="person-outline"
                size={responsiveWidth(6)}
                color="#666"
                style={{ marginRight: responsiveWidth(1.5) }}
              />
            }
            inputType={undefined}
            keyboardType={undefined}
            fieldButtonLabel={undefined}
            fieldButtonFunction={undefined}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginVertical: responsiveWidth(4.2),
            flexDirection: 'column',
          }}>
          <InputField
            label={'Email ID'}
            onChangeText={text => {
              setEmailId(text);
            }}
            value={emailId}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={responsiveWidth(6)}
                color="#666"
                style={{ marginRight: responsiveWidth(1.5) }}
              />
            }
            keyboardType="email-address"
            inputType={undefined}
            fieldButtonLabel={undefined}
            fieldButtonFunction={undefined}
            maxLength={undefined}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginBottom: responsiveWidth(4.2),
            flexDirection: 'column',
          }}>
          <InputField
            label={'Phone Number'}
            icon={
              <MaterialIcons
                name="phone"
                size={responsiveWidth(6)}
                color="#666"
                style={{ marginRight: responsiveWidth(1.5) }}
              />
            }
            keyboardType="phone-pad"
            onChangeText={text => {
              setPhoneNumber(text);
            }}
            value={phoneNumber}
            maxLength={10}
            inputType={undefined}
            fieldButtonLabel={undefined}
            fieldButtonFunction={undefined}
          />
        </View>
        {!verification && <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}>
          <InputField
            label={'OTP'}
            icon={
              <MaterialIcons
                name="phone"
                size={responsiveWidth(6)}
                color="#666"
                style={{ marginRight: responsiveWidth(1.5) }}
              />
            }
            keyboardType="phone-pad"
            onChangeText={text => {
              setOtpValue(text);
            }}
            value={otpValue}
            maxLength={6}
            inputType={undefined}
            fieldButtonLabel={undefined}
            fieldButtonFunction={undefined}
            style={{ width: 500 }}
          />
          {!btnLoading ?
            <CustomButton
              label={!showOtp ? 'Send OTP' : "Verify OTP"}
              onPress={() => {
                if (!showOtp) {
                  handleSendOtp();
                } else {
                  handleVerifyOtp()
                }
              }}
            /> : <ActivityIndicator size="small" color="#7a9f86m" />}
          {showButton && <CustomButton
            label={"Resend"}
            onPress={() => {
              handleSendOtp();
            }}
          />
          }

        </View>}
        <View
          style={{
            flexDirection: 'column',
            marginBottom: responsiveWidth(4.2),
          }}>
          <InputField
            label={'Password'}
            icon={
              <MaterialIcons
                name="password"
                size={responsiveWidth(6)}
                color="#666"
                style={{ marginRight: responsiveWidth(1.5) }}
              />
            }
            keyboardType="default"
            onChangeText={text => {
              setPassword(text);
            }}
            value={password}
            maxLength={20}
            inputType={'password'}
            fieldButtonLabel={undefined}
            fieldButtonFunction={undefined}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginBottom: responsiveWidth(4.2),
            flexDirection: 'column',
          }}>
          <InputField
            label={'address'}
            icon={
              <MaterialIcons
                name="location-on"
                size={responsiveWidth(6)}
                color="#666"
                style={{ marginRight: responsiveWidth(1.5) }}
              />
            }
            keyboardType="default"
            onChangeText={text => {
              setAddress(text);
            }}
            value={address}
            maxLength={100}
            inputType={undefined}
            fieldButtonLabel={undefined}
            fieldButtonFunction={undefined}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginBottom: responsiveWidth(4.2),
            flexDirection: 'column',
          }}>
          <InputField
            label={'Referal code'}
            icon={
              <MaterialIcons
                name="code"
                size={responsiveWidth(6)}
                color="#666"
                style={{ marginRight: responsiveWidth(1.5) }}
              />
            }
            keyboardType="default"
            onChangeText={text => {
              setReferCode(text);
            }}
            value={refral_code}
            maxLength={10}
            inputType={undefined}
            fieldButtonLabel={undefined}
            fieldButtonFunction={undefined}
          />
        </View>
        <Text
          style={{
            color: 'red',
            fontSize: responsiveFontSize(1.5),
            fontFamily: 'Roboto-Regular',
          }}>
          {error}
        </Text>

        <CustomButton
          label={'Sign Up'}
          onPress={() => {
            HandleSignUp();
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: responsiveWidth(8),
          }}>
          <Text style={{ color: '#666' }}>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={{ color: '#7a9f86', fontWeight: '700' }}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Loader visible={isLoadingGlobal} />
    </SafeAreaView>
  );
};

export default RegisterScreen;
