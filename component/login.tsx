import React, { useContext, useEffect, useState } from 'react';
import {  View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';

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
import { CommonActions } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoadingGlobal, setIsLoadingGlobal] = useState("false");
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

  const validatePhone = (phone:string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone) && phone.length === 10;
  };

  const handleUserLogin = async userData => {
    try {
      console.log(userData);
      if (!validatePhone(phone) || !password) {
        Alert.alert('Alert', 'Please fill the values Right');
        return;
      } else {
        setIsLoadingGlobal("true");
        axios
          .post(backend_url + '/api/v1/auth/login', userData)
          .then(({ data }) => {
            setIsLoadingGlobal("false");
            if (data.message) {
              if (!data.success) {
                Alert.alert('Alert!!', data.message);
                return;
              }
            }
            if (data.user) {
              AsyncStorage.setItem('user', JSON.stringify(data.user), () => {
                navigation.navigate('Home');
              });
            }
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
                  setPhone(text);
                }}
                value={phone}
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
                  phone,
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
      <Loader visible={isLoadingGlobal !== "false"} />
    </GestureHandlerRootView>
  );
};

export default LoginScreen;
