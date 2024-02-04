import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Button, ImageBackground, ScrollView, ToastAndroid } from 'react-native';
import CommonHeader from './commonHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { backend_url, updateUserInfo, handle500Error } from './helper';
import { UserObjType } from '../interfaces';
import GoGoSpin from 'react-native-gogo-spin';
import RNUpiPayment from 'react-native-upi-payment';
import Loader from './commons/Loader';

const SIZE = 300;

const LuckySpinner = () => {
  const [upi, setUpi] = useState<null | string>(null)
  const [user, setUser] = useState<null | UserObjType>(null);
  const spinRef = useRef<React.ElementRef<typeof GoGoSpin>>(null);
  const [moreChancePrize, setMoreChancePrice] = useState<number | null>(null);
  const [spinChances, setChances] = useState<number>(0);
  const winRef = useRef<number | null>(null)


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
    AsyncStorage.getItem("spinChances").then((result) => {
      if (result) {
        console.log("res", result);

        if (Number(result) > 0) {
          setChances(+(result));
        }
      }
    });
    axios.get(backend_url + "/api/v1/settings/getAll").then(({ data }) => {
      console.log(data);
      if (data && data.length) {
        const upi = data.filter((setting) => setting.key === "upi_id")
        const prize = data.filter((setting) => setting.key === "get_spinner_chances_in")

        if (prize.length) {
          setMoreChancePrice(prize[0].value)
        }

        if (upi.length) {
          console.log(upi);
          setUpi(upi[0].value)
        } else {
          ToastAndroid.showWithGravity(
            "Failed to get UPI settings, Please Try to relaunch the app",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }

      } else {
        ToastAndroid.showWithGravity(
          "Failed to get UPI settings, Please Try to relaunch the app",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    }).catch((err) => {
      console.log(err);
      ToastAndroid.showWithGravity(
        "Failed to get UPI settings, Please Try to relaunch the app",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    })
  }, []);

  const runSpinner = () => {
    const win = doSpin()
    console.log("win", win);
    winRef.current = win
    console.log("mmwin", win);
    if (win) {
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
    }
  }

  const onSpinPress = async () => {
    winRef.current = null
    const lastSpinnerTime = await AsyncStorage.getItem("lastSpinner");
    if (!lastSpinnerTime || (new Date().getTime() - Number(lastSpinnerTime) >= 24 * 60 * 60 * 1000)) {
      runSpinner()
      await AsyncStorage.setItem("lastSpinner", new Date().getTime().toString());
    }
    else if (spinChances > 0) {
      runSpinner();
      await AsyncStorage.setItem("spinChances", spinChances - 1 + "")
      setChances((pre) => pre - 1)
    }
    else {
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
    console.log('endSuccess', endSuccess, winRef.current);
    Alert.alert("", `You Win ${(winRef.current ?? 0) + ""} points`)
  };

  const onPaymentSuccess = async () => {
    await AsyncStorage.setItem("spinChances", 3 + "")
    setChances(3)
    ToastAndroid.showWithGravity(
      "Wow, You got 3 more lucky chances",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }

  const buyMoreChances = () => {
    RNUpiPayment.initializePayment(
      {
        vpa: upi,
        payeeName: 'Riotinto',
        amount: Number(moreChancePrize),
        transactionRef: 'aaasf-332-aoei-fn',
        transactionNote: 'Riotinto App',
      },
      async (r) => {
        await onPaymentSuccess();
      },
      async (err) => {
        console.log("err", err);
        if (typeof err === "object" && err.hasOwnProperty("Status") && err.Status === "Success") {
          await onPaymentSuccess();
        } else {
          ToastAndroid.showWithGravity(
            "Looks Like payment has cancel from your side.",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      },
    );
  }

  const showConfirmationAlert = () => {
    Alert.alert(
      "🌟 Exciting Offer! 🌟",
      "🎉 Special Deal: Buy 3 extra spin chances for only 100 Rs! 🎉\n\nDon't miss out on this amazing opportunity to increase your chances of winning big. Are you ready to spin and win more? 💰",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: buyMoreChances,
          isPreferred: true
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <CommonHeader title="Lucky Spin" previousPage="transparent" spinChances={spinChances} />
      <ScrollView contentContainerStyle={styles.container}>
        <ImageBackground
          source={require('./assets/spinning-wheel.png')}
          style={styles.backgroundImage}
        >
          <View style={styles.rowContainer}>
            <Text>
              <Text style={styles.prizeText}>{winRef.current && winRef.current !== 0 ? ("Price: " + winRef.current) : winRef.current === 0 ?? "Better Luck Next Time"}</Text>
              {winRef.current && winRef.current !== 0 ? (<Image source={require('./assets/prize.png')} style={styles.itemWrap} />) : ""}
            </Text>
          </View>
          <View style={styles.centerWheel}>
            <GoGoSpin
              ref={spinRef}
              onEndSpinCallBack={onEndSpin}
              notShowDividLine={false}
              spinDuration={500}
              spinReverse={false}
              spinTime={10}
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
          <TouchableOpacity onPress={showConfirmationAlert}>
            <Text style={styles.footer}>Buy More chances</Text>
          </TouchableOpacity>
        </ImageBackground>
      </ScrollView>
      <Loader visible={!upi} />
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'repeat',
    justifyContent: 'center',
    overflow: "hidden"
  },
  footer: {
    color: "#fefefe",
    borderColor: "#7a9f86",
    textAlign: "center",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#7a9f86",
    borderWidth: 1,
    padding: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
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
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  centerWheel: {
    width: SIZE,
    height: SIZE,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 30,
    paddingLeft: 5
  },
  itemWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinBtn: {
    width: 105, height: 145
  },
  spinWarp: { position: 'absolute' },
  itemWrap: { width: 40, height: 40 },
});

export default LuckySpinner;
