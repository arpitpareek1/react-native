import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CommonHeader from './commonHeader'
import { useFocusEffect } from '@react-navigation/native';
import { UserObjType } from '../interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewProduct = ({ route, navigation }) => {
  const { imageSource, title, price, dailyIncome, validityPeriod, desc, isHot } = route.params;
  const [paymentMode, setPaymentMode] = useState("")
  const [userData, setUserData] = useState<null | UserObjType>(null)
  console.log("paymentMode", paymentMode);

  // useFocusEffect(() => {

  // })
  useEffect(() => {
    AsyncStorage.getItem("user").then((res) => {
      if (res) setUserData(JSON.parse(res))
    })
  }, [])

  const handleBuyButton = () => {
    let text = ""
    if (paymentMode === "") {
      text = "Please Choose an payment mode!!!"
    } else if (paymentMode === "Recharge") {
      navigation.navigate("AddFundScreen", {
        pointsToAdd: price
      })
    } else if (paymentMode === "Balance") {
      console.log(price, userData);

      if (userData && price > userData?.rechargePoints) {
        text = "You didn't have points to buy the product. please recharge!!"
      } else {
        navigation.navigate("BuyProductPage", {
          ...route.params
        })
      }
    }
    if (text !== "") {
      Alert.alert("Alert", text);
    }

  }

  return (
    <>
      <CommonHeader title='Product Details' previousPage='' />
      <ScrollView>
        <View style={styles.appCapsule}>
          <View style={styles.postBody}>
            <Image
              source={{
                uri: imageSource,
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.appContent}>
            <View style={styles.goodInfo}>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.text}>
                <View style={styles.details}>
                  <View style={styles.detailsText}>
                    <Text style={styles.strong}>Price </Text>
                    <Text style={styles.detailsItem}> {price} Rs</Text>
                  </View>
                  {!isHot && (<View style={styles.detailsText}>
                    <Text style={styles.strong}>Daily income </Text>
                    <Text style={styles.detailsItem}> {dailyIncome} Rs</Text>
                  </View>)}
                  <View style={styles.detailsText}>
                    <Text style={styles.strong}>Validity period </Text>
                    <Text style={styles.detailsItem}> {validityPeriod + " " + "Days"}</Text>
                  </View>
                  <View style={styles.detailsText}>
                    <Text style={styles.strong}>Total revenue </Text>
                    <Text style={styles.detailsItem}> {dailyIncome * validityPeriod} Rs</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.wallet}>
              <View style={styles.titleContainer}>
                <Text style={styles.walletTitle}>Choose a wallet</Text>
              </View>
              <View style={styles.tit}>
                  <Text style={{ ...styles.walletText, backgroundColor: `${paymentMode === "Recharge" ? '#7a9f86' : '#fff'}` }} onPress={() => { setPaymentMode("Recharge") }}>
                    Recharge
                  </Text>
                <Text style={{ ...styles.walletText, backgroundColor: `${paymentMode === "Balance" ? '#7a9f86' : '#fff'}` }} onPress={() => { setPaymentMode("Balance") }}>
                  Balance
                </Text>
              </View>
            </View>
            <View style={styles.gooddesc}>
              <View style={styles.titleContainer}>
                <Text style={styles.detailsTitle}>Details</Text>
              </View>
              <View style={styles.cobn} >
                <Text style={styles.detailsItem}>{desc}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.container}>
        <View style={styles.leftContent}>
          <View style={styles.titleColor}>
            <Text style={styles.strikethrough}>₹ {price}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => { }}>
          <Text style={styles.buyButton} onPress={() => handleBuyButton()}>Buy</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderTopColor: '#97b4a1',
    borderTopWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  leftContent: {
    flex: 1,
  },
  titleColor: {
    color: '#000',
    marginBottom: 0,
    flexDirection: 'row',
    gap: 10,
  },
  strikethrough: {
    color: '#567660',
    fontWeight: '500',
    fontSize: 16
  },
  buyButton: {
    backgroundColor: '#60856c',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btn: {
    alignItems: 'flex-end',
  },
  appCapsule: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'column',
    gap: 20,
  },
  postBody: {
    width: '100%',
    height: 300,
  },
  image: {
    height: 300,
  },
  appContent: {
    paddingVertical: 20,
  },
  goodInfo: {
    backgroundColor: '#F5F7F9',
    borderRadius: 10,
    color: 'black',
    padding: 15,
  },
  titleContainer: {
    // height: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    color: 'black',
  },
  text: {
    marginTop: 2,
  },
  details: {
    paddingVertical: 10,
    gap: 5,
  },
  detailsText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  strong: {
    fontWeight: '400',
    color: 'black',
  },
  detailsItem: {
    color: 'black',
    fontWeight: '500',
  },
  wallet: {
    backgroundColor: '#F5F7F9',
    borderRadius: 10,
    color: 'black',
    padding: 15,
    marginTop: 20,
  },
  walletTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    color: 'black',
  },
  tit: {
    paddingTop: 10,
    flexDirection: 'row',
    gap: 10,
  },
  walletText: {
    color: 'black',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  gooddesc: {
    backgroundColor: '#F5F7F9',
    borderRadius: 10,
    color: 'black',
    padding: 15,
    marginTop: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    color: 'black',
  },
  cobn: {
    // Add your content inside cobn
  },
});

export default ViewProduct;
