import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, Alert} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import LoginSVG from '../assets/images/misc/login.svg';

import CustomButton from './commons/CustomButton';
import InputField from './commons/InputField';
import Loader from './commons/Loader';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import axios from 'axios';
import {backend_url} from './helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const LoginScreen = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [verification, setVerification] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [isLoadingGlobal, setIsLoadingGlobal] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [error, setError] = useState('');

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleUserLogin = async userData => {
    try {
      setIsLoadingGlobal(true); // Start global loader
      console.log(userData);
      if (!validateEmail(email) || !password) {
        Alert.alert('Alert', 'Please fill the values Right');
        return;
      } else {
        axios
          .post(backend_url + '/auth/login', userData)
          .then(({data}) => {
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
          .catch(console.log);
      }
    } catch (error) {
      console.error('Error handling user login:', error);
    } finally {
      setIsLoadingGlobal(false); // Stop global loader
    }
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: responsiveWidth(7)}}>
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: responsiveFontSize(3.8),
            fontWeight: '500',
            color: '#333',
            marginBottom: responsiveWidth(8),
          }}>
          Login
        </Text>
        <View
          style={{flexDirection: 'column', marginBottom: responsiveWidth(4.2)}}>
          <InputField
            label={'Email'}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={responsiveWidth(6)}
                color="#666"
                style={{marginRight: responsiveWidth(1.5)}}
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
          style={{flexDirection: 'column', marginBottom: responsiveWidth(4.2)}}>
          <InputField
            label={'Password'}
            icon={
              <MaterialIcons
                name="password"
                size={responsiveWidth(6)}
                color="#666"
                style={{marginRight: responsiveWidth(1.5)}}
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
          <Text style={{color: '#666'}}>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{color: '#000', fontWeight: '700'}}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loader visible={isLoadingGlobal} />
    </SafeAreaView>
  );
};

export default LoginScreen;
