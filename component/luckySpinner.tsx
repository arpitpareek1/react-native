import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import LuckyWheel from 'react-native-lucky-wheel';
import CommonHeader from './commonHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { log } from 'react-native-reanimated';
import axios from 'axios';
import { backend_url, updateUserInfo, handle500Error } from './helper';
import { UserObjType } from '../interfaces';
const LuckySpinner = () => {
  const wheelRef = useRef<null | any>(null);
  const [isRunning, setIsRunning] = useState(false)
  const [user, setUser] = useState<null | UserObjType>(null)


  useEffect(() => {
    AsyncStorage.getItem("user").then((result) => {
      if (result) { setUser(JSON.parse(result)) }
    })
  }, [])
  const onSpinPress = () => {
    AsyncStorage.getItem("lastSpinner").then(async (res) => {
      //TODO:API CALL
      if (!res || (new Date().getTime() - Number(res) >= 24 * 60 * 60 * 1000)) {
        setIsRunning(true);
        (wheelRef.current)!.start();
        await AsyncStorage.setItem("lastSpinner", new Date().getTime().toString())
      } else {
        Alert.alert("Wait !!", "You need to wait try to your luck because you only can try once in a day.")
      }
    })
  };

  const priceArr = [
    { text: '10' },
    { text: '5' },
    { text: '1' },
    { text: '0' },
    { text: '30' },
    { text: '10' },
    { text: '15' },
    { text: '20' },
  ]

  return (
    <>
      <CommonHeader title="Lucky Spin" previousPage="" />
      <View style={styles.container}>
        <LuckyWheel
          ref={wheelRef}
          diameter={300}
          waitWinner={false}
          slices={priceArr}
          knobColor={'#7a9f86'}
          dotColor={"#7a9f86"}
          duration={10}
          onSpinningEnd={(r) => {
            console.log("result", r);
            (wheelRef.current)!.stop();
            setIsRunning(false)
            if (r.text !== "0") {
              axios.post(backend_url + "/api/v1/transactions/addMoneyToWallet", {
                email: user?.email, amount: Number(r.text)
              }).then(async ({ data }) => {
                console.log("data", data);
                if (data.status) {
                  updateUserInfo()
                }
              }).catch((error) => {
                handle500Error(error.message)
              })
              Alert.alert("Congratulations", `You Win ${r.text} point`)
            } else {
              Alert.alert("Bad Luck ", "Better luck next time.")
            }
          }}
        />
        <TouchableOpacity style={styles.spinButton} onPress={onSpinPress} disabled={isRunning}>
          <Text style={styles.buttonText}>Spin to Win</Text>
        </TouchableOpacity>
        {/* <Button title={"reset"} onPress={() => AsyncStorage.removeItem("lastSpinner")}></Button> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#7a9f86',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});


export default LuckySpinner;
