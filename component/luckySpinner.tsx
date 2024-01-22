import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import CommonHeader from './commonHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { log } from 'react-native-reanimated';
import axios from 'axios';
import { backend_url, updateUserInfo, handle500Error } from './helper';
import { UserObjType } from '../interfaces';
import GoGoSpin from 'react-native-gogo-spin';
const SIZE = 300;

const LuckySpinner = () => {
  const [user, setUser] = useState<null | UserObjType>(null);
  const spinRef = useRef<React.ElementRef<typeof GoGoSpin>>(null);
  const [prizeIdx, setprizeIdx] = useState<number | null>(null);
  const prize = [
    { name: '1000', image: require('./assets/king.png') },
    { name: '500', image: require('./assets/prize.png') },
    { name: '20', image: require('./assets/prize.png') },
    { name: 'Lost', image: require('./assets/prize.png') },
    { name: '40', image: require('./assets/prize.png') },
    { name: '100', image: require('./assets/prize.png') },
    { name: '200', image: require('./assets/prize.png') },
  ];


  useEffect(() => {
    AsyncStorage.getItem("user").then((result) => {
      if (result) { setUser(JSON.parse(result)); }
    });
  }, []);

  const onSpinPress = async () => {
    setprizeIdx(null)
    const lastSpinnerTime = await AsyncStorage.getItem("lastSpinner");
    if (!lastSpinnerTime || (new Date().getTime() - Number(lastSpinnerTime) >= 24 * 60 * 60 * 1000)) {
      const win = doSpin()
      setTimeout(() => {
        setprizeIdx(win)
      }, 5000)
      axios.post(backend_url + "/api/v1/transactions/addMoneyToWallet", {
        email: user?.email, amount: Number(win)
      }).then(async ({ data }) => {
        console.log("data", data);
        if (data.status) {
          updateUserInfo()
        }
      }).catch((error) => {
        console.log(error);

        handle500Error(error.message)
      })
      await AsyncStorage.setItem("lastSpinner", new Date().getTime().toString());
    } else {
      Alert.alert("Wait !!", "You need to wait to try your luck because you can only try once a day.");
    }
  };

  const doSpin = () => {
    // Generate a random number between 1 and 100 to represent the percentage
    const randomPercentage = Math.random() * 100;

    // 5% chance for 20 points
    if (randomPercentage < 5) {
      // setprizeIdx(2); // Index of the 20 points prize
      spinRef?.current?.doSpinAnimate(2);
      return 20;
    }
    // 5% chance for 40 points
    else if (randomPercentage < 10) {
      // setprizeIdx(4); // Index of the 40 points prize
      spinRef?.current?.doSpinAnimate(4);
      return 40;
    }
    // 1% chance for 100 points
    else if (randomPercentage < 11) {
      // setprizeIdx(5); // Index of the 100 points prize
      spinRef?.current?.doSpinAnimate(5);
      return 100;
    }
    // The remaining 89% get a loss
    else {
      // setprizeIdx(3); // Index of the "Lost" prize
      spinRef?.current?.doSpinAnimate(3);
      return 0; // Loss
    }
  };



  const onEndSpin = (endSuccess: boolean) => {
    console.log('endSuccess', endSuccess);
    // Alert.alert("Congratulations", `You Win ${prizeIdx} point`)
  };


  return (
    <>
      <CommonHeader title="Lucky Spin" previousPage="" />
      <View style={styles.container}>

        <View style={styles.rowContainer}>
          <Text>

            <Text style={styles.prizeText}>{prizeIdx && prizeIdx !== 0 ? ("Price: " + prizeIdx) : ""}</Text>
            {prizeIdx && prizeIdx !== 0 && (<Image source={require('./assets/prize.png')} style={styles.itemWrap} />)}
          </Text>

        </View>


        <View style={styles.centerWheel}>
          <GoGoSpin
            onEndSpinCallBack={onEndSpin}
            notShowDividLine={false}
            spinDuration={5000}
            spinReverse={false}
            spinTime={10}
            ref={spinRef}
            width={SIZE}
            height={SIZE}
            radius={SIZE / 2}
            data={prize}
            borderStyle={{ borderBlockColor: "#000", borderCurve: 'circular' }}
            wheelStyle={{ columnGap: 30 }}
            offsetEnable={false}
            source={require('./assets/wheel.png')}
            renderItem={(data, i) => {
              return (
                <View key={i + Math.random()} style={styles.itemWrapper}>
                  <Text style={styles.prizeText}>{data.name}</Text>
                  <Image source={data.image} style={styles.itemWrap} />
                </View>
              );
            }}
          />
          <TouchableOpacity style={styles.spinWarp} onPress={onSpinPress}>
            <Image source={require('./assets/btn.png')} style={styles.spinBtn} />
          </TouchableOpacity>
          {/* <Button title={"reset"} onPress={() => AsyncStorage.removeItem("lastSpinner")}></Button> */}
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
  startText: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
  prizeText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  centerWheel: {
    width: SIZE,
    height: SIZE,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinBtn: { width: 105, height: 124 },
  spinWarp: { position: 'absolute' },
  itemWrap: { width: 40, height: 40 },
});

export default LuckySpinner;
