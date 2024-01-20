import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const OtpInput = () => {
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60);



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter OTP</Text>

            <View style={styles.otpInputContainer}>
                {/* {[1, 2, 3, 4, 5, 6].map((digit) => ( */}
                <TextInput
                    style={styles.otpInput}
                    maxLength={1}
                    keyboardType="numeric"
                    value={otp}
                    onChangeText={(text) => {
                        setOtp(text);
                    }}
                />
                {/* ))} */}
            </View>

            <Text style={styles.timerText}>
                Resend OTP in {timer} seconds
            </Text>

            <TouchableOpacity onPress={handleResendOTP}>
                <Text style={styles.resendText}>Resend OTP</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    otpInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        marginBottom: 20,
    },
    otpInput: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderRadius: 8,
        textAlign: 'center',
        color: "black",
        fontSize: 16,
    },
    timerText: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 16,
    },
    resendText: {
        color: 'blue',
        fontSize: 16,
    },
});

export default OtpInput;
