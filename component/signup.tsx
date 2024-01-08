import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const SignupScreen = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [serverOtp, setServerOtp] = useState('');

  const handleSignup = async () => {
    console.log('Signup pressed');
    console.log('Full Name:', fullName);
    console.log('Phone Number:', phoneNumber);
    console.log('OTP Code:', otpCode);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    console.log('Referral Code:', referralCode);
    const response = await axios.post(
      'http://localhost:8080/api/v1/auth/signup',
      {
        fullName,
        phoneNumber,
        otpCode,
        password,
        confirmPassword,
        referralCode,
      },
    );
  };
  const sendOtp = async () => {
    const response = await axios.get(
      'http://localhost:8080/api/v1/auth/sent-otp',
    );
    setServerOtp(response.data.data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={text => setFullName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="OTP Code"
        value={otpCode}
        onChangeText={text => setOtpCode(text)}
        keyboardType="numeric"
      />
      <Button title="send otp" onPress={sendOtp}></Button>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Referral Code"
        value={referralCode}
        onChangeText={text => setReferralCode(text)}
      />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default SignupScreen;
