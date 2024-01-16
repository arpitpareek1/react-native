import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import LuckyWheel from 'react-native-lucky-wheel';
import CommonHeader from './commonHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { log } from 'react-native-reanimated';
const LuckySpinner = () => {
  const wheelRef = useRef<null | any>(null);
  const [isRunning, setIsRunning] = useState(false)

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
    { text: '51 points' },
    { text: '52 points' },
    { text: '53 points' },
    { text: '54 points' },
    { text: '55 points' },
    { text: '56 points' },
    { text: '57 points' },
    { text: '58 points' },
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
          }}
        />
        <TouchableOpacity style={styles.spinButton} onPress={onSpinPress} disabled={isRunning}>
          <Text style={styles.buttonText}>Spin to Win</Text>
        </TouchableOpacity>
        <Button title={"reset"} onPress={() => AsyncStorage.removeItem("lastSpinner")}></Button>
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
