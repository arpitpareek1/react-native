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
import GoGoSpin from 'react-native-gogo-spin';
const SIZE = 300;

const LuckySpinner = () => {
  const [user, setUser] = useState<null | UserObjType>(null);
  const spinRef = useRef<React.ElementRef<typeof GoGoSpin>>(null);
  const [prizeIdx, setprizeIdx] = useState(-1);
  const prize = [
    { name: 'x999', image: require('./assets/king.png') },
    { name: 'x10', image: require('./assets/prize.png') },
    { name: 'x20', image: require('./assets/prize.png') },
    { name: 'x25', image: require('./assets/prize.png') },
    { name: 'x15', image: require('./assets/prize.png') },
    { name: 'x20', image: require('./assets/prize.png') },
    { name: 'x80', image: require('./assets/prize.png') },
    { name: 'x100', image: require('./assets/prize.png') },
    { name: 'x200', image: require('./assets/prize.png') },
  ];


  useEffect(() => {
    AsyncStorage.getItem("user").then((result) => {
      if (result) { setUser(JSON.parse(result)); }
    });
  }, []);

  const onSpinPress = async () => {
    const lastSpinnerTime = await AsyncStorage.getItem("lastSpinner");
    if (!lastSpinnerTime || (new Date().getTime() - Number(lastSpinnerTime) >= 24 * 60 * 60 * 1000)) {
      const win = doSpin()
      axios.post(backend_url + "/api/v1/transactions/addMoneyToWallet", {
        email: user?.email, amount: Number(win)
      }).then(async ({ data }) => {
        console.log("data", data);
        if (data.status) {
          updateUserInfo()
        }
      }).catch((error) => {
        handle500Error(error.message)
      })
      await AsyncStorage.setItem("lastSpinner", new Date().getTime().toString());
    } else {
      Alert.alert("Wait !!", "You need to wait to try your luck because you can only try once a day.");
    }
  };

  const doSpin = () => {
    const arr = [1, 2, 3, 4, 5]
    const winnerId = Math.floor(Math.random() * arr.length)
    setprizeIdx(arr[winnerId]);
    spinRef?.current?.doSpinAnimate(arr[winnerId]);
    return arr[winnerId]
  };
  const onEndSpin = (endSuccess: boolean) => {
    console.log('endSuccess', endSuccess);
    Alert.alert("Congratulations", `You Win ${prizeIdx} point`)
  };


  return (
    <>
      <CommonHeader title="Lucky Spin" previousPage="" />
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text style={styles.prizeText}>Price:{prizeIdx !== -1 ? prize[prizeIdx]?.name : ''}</Text>
          <Image source={prize[prizeIdx]?.image} style={styles.itemWrap} />
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
                <View key={i} style={styles.itemWrapper}>
                  <Text style={styles.prizeText}>{data.name}</Text>
                  <Image source={data.image} style={styles.itemWrap} />
                </View>
              );
            }}
          />
          <TouchableOpacity style={styles.spinWarp} onPress={onSpinPress}>
            <Image source={require('./assets/btn.png')} style={styles.spinBtn} />

          </TouchableOpacity>
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
