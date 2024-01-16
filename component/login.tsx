import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CustomButton from './commons/CustomButton';
import InputField from './commons/InputField';
import Loader from './commons/Loader';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import axios from 'axios';
import { backend_url } from './helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonHeader from './commonHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import EmailIcon from '@mui/icons-material/Email';
import SvgIcon from '@mui/material/SvgIcon';
import { Icon } from '@rneui/themed';
import { useFocusEffect, CommonActions } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const LoginScreen = ({ navigation }) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [verification, setVerification] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [isLoadingGlobal, setIsLoadingGlobal] = useState("false");
  const [otpError, setOtpError] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    AsyncStorage.getItem('user', (error, result) => {
      console.log("res", result);
      if (typeof result !== "string") {
        return
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' },],
          })
        );
      }
    }).finally(() => {
      setLoading(false)
    });
  }, [])

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleUserLogin = async userData => {
    try {
      setIsLoadingGlobal("true");
      console.log(userData);
      if (!validateEmail(email) || !password) {
        Alert.alert('Alert', 'Please fill the values Right');
        return;
      } else {
        console.log(backend_url + '/api/v1/auth/login');

        axios
          .post(backend_url + '/api/v1/auth/login', userData)
          .then(({ data }) => {
            setIsLoadingGlobal("false"); // Stop global loader

            console.log(data);

            if (data.message) {
              Alert.alert('alert', data.message);
              if (!data.success) {
                return;
              }
            }
            if (data.user) {
              AsyncStorage.setItem('user', JSON.stringify(data.user), () => {
                navigation.navigate('Home');
              });
            }
            console.log('jj', data);
          })
          .catch((e) => {
            Alert.alert("Error", e.message)
          });
      }
    } catch (error) {
      setIsLoadingGlobal("false"); // Stop global loader
      console.error('Error handling user login:', error);
    }
  };
  console.log("loading", loading);
  console.log("isLoadingGlobal", isLoadingGlobal)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}> */}
      <CommonHeader title="Login" previousPage="" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: responsiveWidth(7) }}>
        {!loading ?
          <View>
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                fontSize: responsiveFontSize(3.8),
                fontWeight: '500',
                paddingTop: 30,
                color: '#7a9f86',
                marginBottom: responsiveWidth(8),
              }}>
              Login
            </Text>
            <View
              style={{ flexDirection: 'column', marginBottom: responsiveWidth(4.2) }}>
              <InputField
                label={'Email'}
                icon={
                  <MaterialIcons
                    name="alternate-email"
                    size={responsiveWidth(6)}
                    color="#666"
                    style={{ marginRight: responsiveWidth(1.5) }}
                  />
                }
                keyboardType="email-address"
                onChangeText={text => {
                  setemail(text);
                }}
                value={email}
                maxLength={40}
                inputType={undefined}
                fieldButtonLabel={undefined}
                fieldButtonFunction={undefined}
              />
            </View>
            <View
              style={{ flexDirection: 'column', marginBottom: responsiveWidth(4.2) }}>
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
            <CustomButton
              label={'Login'}
              onPress={() => {
                handleUserLogin({
                  email,
                  password,
                });
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: responsiveWidth(8),
              }}>
              <Text style={{ color: '#666' }}>New to the app?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={{ color: '#7a9f86', fontWeight: '700' }}> Register</Text>
              </TouchableOpacity>
            </View>
          </View> :
          <Loader visible={true} />
        }
      </ScrollView>
      {/* </SafeAreaView> */}
        <Loader visible={isLoadingGlobal !== "false"} />
    </GestureHandlerRootView>
  );
};

export default LoginScreen;
