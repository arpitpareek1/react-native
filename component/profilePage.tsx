import React, {useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  Dimensions,
} from 'react-native';
import {
  GoodItemProps,
  ProductItemProps,
  NewsItemProps,
  SupportProps,
} from '../interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {openURL} from 'react-native-url-launcher';
import RNUpiPayment from 'react-native-upi-payment';
import CommonHeader from './commonHeader';
import BottomNavigation from './buttomBar';
import DefaultImage1 from './assets/user.png';

const Profile: React.FC<SupportProps> = ({navigation}) => {
  useEffect(() => {
    AsyncStorage.getItem('user', (error, result) => {
      console.log(error, result);
      if (!result) {
        //comment this vipin to fix the view going to login
        //navigation.navigate('LoginScreen');
      }
    });
  }, []);

  return (
    <View style={{height: Dimensions.get('window').height}}>
      <CommonHeader title="Account" previousPage="" />
      <BottomNavigation navigation={navigation.navigate} />
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.desc}>
            <View style={styles.listView}>
              <View style={styles.listItem}>
                <View style={styles.iconBox}>
                  <Image
                    source={{uri: Image.resolveAssetSource(DefaultImage1).uri}}
                    style={{width: 50, height: 50}}
                  />
                </View>
                <View style={styles.text}>
                  <View>
                    <View style={styles.leveltitle}>
                      <Text style={styles.cInfo}>VIP-0</Text>
                    </View>
                    <Text style={styles.leveltitle}>9950929557</Text>
                  </View>
                </View>
              </View>
              <View style={styles.cardContent}>
                <View style={styles.cardInfo}>
                  <View style={styles.holderInfo}>
                    <Text style={styles.cName}>0</Text>
                    <Text style={styles.cInfo}>Total income</Text>
                  </View>
                  <View style={styles.holderInfo}>
                    <Text style={styles.cName}>0</Text>
                    <Text style={styles.cInfo}>Total income</Text>
                  </View>
                  <View style={styles.holderInfo}>
                    <Text style={styles.cName}>0</Text>
                    <Text style={styles.cInfo}>Total income</Text>
                  </View>
                </View>
                <Button
                  title="buy "
                  color={'#7a9f86'}
                  onPress={async () => {
                    RNUpiPayment.initializePayment(
                      {
                        vpa: 'sahil-dholpuria@paytm',
                        payeeName: 'Kalyan Satta',
                        amount: 1,
                        transactionRef: 'aasf-332-aoei-fn-ii',
                        transactionNote: 'Kalyan Satta App',
                      },
                      console.log,
                      console.log,
                    );
                  }}></Button>
              </View>
            </View>
          </View>
          <View style={styles.currentBalance}>
            <View style={styles.currentBalanceBlock}>
              <Text style={styles.cName}>0</Text>
              <Text style={styles.cInfo}>Recharge</Text>
            </View>
            <View style={styles.currentBalanceBlock}>
              <Text style={styles.cName}>0</Text>
              <Text style={styles.cInfo}>Recharge</Text>
            </View>
          </View>
          <View
            style={{
              padding: 10,
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              height: 600,
              marginTop: 70,
            }}></View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = {
  content: {
    backgroundColor: '#7a9f86',
    borderTopColor: '#6b9478',
    borderTopWidth: 1,
  },
  desc: {
    padding: 20,
    paddingvertical: 50,
  },
  listView: {},
  listItem: {
    flexDirection: 'row',
    gap: 10,
  },
  iconBox: {
    marginRight: 8,
  },
  text: {
    paddingVertical: 5,
  },
  leveltitle: {
    fontSize: 15,
    fontWeight: '400',
    color: '#000000', // Change text color to black
  },
  cardContent: {
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  cardInfo: {
    flexDirection: 'row',
    paddingVertical: 30,
  },
  holderInfo: {
    width: (Dimensions.get('window').width - 40) / 3,
    padding: 10,
  },
  cName: {
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
    textAlign: 'center',
  },
  cInfo: {
    fontSize: 12,
    color: '#000',
    fontWeight: '400',
    textAlign: 'center',
  },
  currentBalance: {
    flexDirection: 'row',
    paddingVertical: 30,
    backgroundColor: 'white',
    marginHorizontal: 30,
    width: Dimensions.get('window').width - 60,
    borderRadius: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    position: 'absolute',
    top: 250,
    zIndex: 1,
  },
  currentBalanceBlock: {
    width: (Dimensions.get('window').width - 60) / 2,
    padding: 10,
  },
  wallet: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  c2Name: {
    marginBottom: 0,
    color: '#000000', // Change text color to black
  },
  c2Info: {
    fontSize: 12,
  },
  myrow: {
    width: '100%',
    height: 60,
  },
  recharge: {
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: '#ffffff',
  },
  listMenu: {
    backgroundColor: 'transparent',
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#000000', // Change text color to black
  },
  logout: {
    marginTop: 10,
  },
  logoutBtn: {
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  logoutText: {
    color: '#ffffff',
  },
};

export default Profile;
