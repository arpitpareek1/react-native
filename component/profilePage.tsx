import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';

import RNUpiPayment from 'react-native-upi-payment';

const Profile = () => {
  return (
    <ScrollView>
      <View style={styles.content}>
        <View style={styles.desc}>
          <View style={styles.listView}>
            <View style={styles.listItem}>
              <View style={styles.iconBox}>
                {/* <Image source={require('./path/to/user-icon.png')} /> */}
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
              </View>
              <Button
                title="buy "
                onPress={() => {
                  RNUpiPayment.initializePayment(
                    {
                      vpa: 'vipin613@paytm', // or can be john@ybl or mobileNo@upi
                      payeeName: 'John Doe',
                      amount: '1',
                      transactionRef: 'aasf-332-aoei-fn',
                    },
                    res => {
                      console.log('res', res);
                    },
                    err => {
                      console.log('err', err);
                    },
                  );
                }}></Button>
              {/* Add other card info blocks here */}
            </View>
          </View>
        </View>
        {/* Add other components with styles here */}
      </View>
    </ScrollView>
  );
};

const styles = {
  content: {
    paddingBottom: 2,
  },
  desc: {
    marginTop: 0,
    paddingLeft: 0,
    backgroundColor: 'transparent',
  },
  listView: {},
  listItem: {
    // backgroundColor: 'transparent',
    // paddingLeft: 0,
    // marginTop: 0,
    // flexDirection: 'row',
  },
  iconBox: {
    marginRight: 8,
  },
  holderInfo: {},
  text: {
    marginTop: 2,
  },
  leveltitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000000', // Change text color to black
  },
  cardContent: {
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  cardInfo: {
    // textalign: '',
  },
  cName: {
    marginTop: 2,
    marginBottom: 0,
    color: '#000000', // Change text color to black
  },
  cInfo: {
    fontSize: 12,
    color: '#000',
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
