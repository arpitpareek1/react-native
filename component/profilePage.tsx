import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  Button,
  Dimensions,
  Alert,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {
  SupportProps, UserObjType,
} from '../interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonHeader from './commonHeader';
import BottomNavigation from './buttomBar';
import DefaultImage1 from './assets/user.png';
import CustomButton from './commons/CustomButton';
import { useFocusEffect, CommonActions } from '@react-navigation/native';
import { menuItems } from './helper';

const Profile: React.FC<SupportProps> = ({ navigation }) => {
  const [user, setUser] = useState<null | UserObjType>(null)

  useFocusEffect(() => {
    setUserInfo()
  });

  function handleListClick(title: string) {
    if (title === "My Orders") {
      navigation.navigate("AllActiveTrasctions")
    } else if (title === "Add Bank Info") {
      navigation.navigate("Bank")
    } else if (title === "Redeem Daily Earning") {
      navigation.navigate("CliamReward")
    } else if (title === "Add Paytm Info") {
      navigation.navigate("Paytm")
    } else if (title === "Add PhonePe Info") {
      navigation.navigate("Phonepe")
    } else if (title === "Add Google pay Info") {
      navigation.navigate("Googlepay")
    } else if (title === "About Us") {
      navigation.navigate("AboutUs")
    } else if (title === "Support") {
      navigation.navigate("Support")
    } else if (title === "Privacy Policy") {
      navigation.navigate("Policy")
    }
  }

  function setUserInfo() {
    AsyncStorage.getItem('user', (error, result) => {
      if (!result) {
        navigation.navigate('LoginScreen');
      } else {
        setUser(JSON.parse(result))
      }
    });
  }
  const getFirstLastCrecter = (name: string) => {
    const words = name.split(' ');
    const initials = words.map(word => word.charAt(0)).join('');
    const uppercaseInitials = initials.toUpperCase();
    return uppercaseInitials;
  }

  function logout() {
    AsyncStorage.removeItem("user").then(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "LoginScreen" },],
        })
      );
    })

  }
  return (
    <View style={{ height: Dimensions.get('window').height }}>
      <CommonHeader title="Account" previousPage="" />
      <BottomNavigation navigation={navigation.navigate} />
      <ScrollView >
        <View style={styles.content}>
          <View style={styles.desc}>
            <View style={styles.listView}>
              <View style={{ ...styles.listItem, flexDirection: "row" }}>
                <View style={styles.iconBox}>
                  <View style={styles.levelt}>
                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: '500', fontSize: 18 }}>{user && user.name && getFirstLastCrecter(user?.name!)}</Text>
                  </View>
                </View>
                <View style={styles.text}>
                  <View>
                    <View style={{}}>
                      <Text style={{
                        fontSize: 16,
                        color: '#fff',
                        fontWeight: '500',
                        textAlign: 'left',
                      }}>{user?.name}</Text>
                    </View>
                    <Text style={{ ...styles.leveltitle, }}>{user?.phone}</Text>
                    <Text style={{ ...styles.leveltitle, }}>{user?.email}</Text>
                    <Text style={{ ...styles.leveltitle, }}>Your Refer code - {user?.referralCode}</Text>
                  </View>
                </View>
              </View>
              <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              </View>
            </View>
          </View>
          <View style={{
            flexDirection: 'row',
            paddingVertical: 30,
            backgroundColor: 'white',
            marginHorizontal: 30,
            width: Dimensions.get('window').width - 60,
            borderRadius: 20,
            borderColor: '#ccc',
            borderWidth: 1,
            position: 'absolute',
            top: 200,
            zIndex: 1,
          }}>
            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{
                fontSize: 18,
                color: '#000',
                fontWeight: '700',
                textAlign: 'center',
              }}>{"₹" + user?.money}</Text>
              <Text style={{
                fontSize: 12,
                color: '#000',
                fontWeight: '400',
                textAlign: 'center',
              }}>Wallet Balance</Text>
            </View>
          </View>
          <View
            style={{
              padding: 10,
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              marginTop: 70,
            }}>
            <View style={{
              paddingTop: 60,
              flexDirection: "row",
              justifyContent: "space-evenly"
            }}>
              <TouchableOpacity onPress={() => { navigation.navigate("AddFundScreen") }}>
                <Text style={{ backgroundColor: '#7a9f86', color: '#fff', padding: 15, paddingHorizontal: 30, borderRadius: 10 }}>Recharge</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { navigation.navigate("WithDrawPage") }}>
                <Text style={{ backgroundColor: '#7a9f86', color: '#fff', padding: 15, paddingHorizontal: 30, borderRadius: 10 }}>Withdrow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.listMenu}>
          {menuItems && menuItems.map((menuItem, index) => (
            <TouchableOpacity key={index} onPress={() => { handleListClick(menuItem.title) }}>
              <View style={{ backgroundColor: '#fff', borderTopColor: '#ccc', borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#000', paddingTop: 15 }}>{menuItem.title}</Text>
                <Text style={{ color: '#000', fontSize: 30 }}>›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: 'column', paddingBottom: 20 }}>
          <CustomButton
            label={'logout'}
            onPress={() => {
              logout()
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  levelt: {
    backgroundColor: '#424242',
    padding: 10,
    borderRadius: 10,
    width: 70,
    height: 70,
    justifyContent: 'center',
    borderCurve: "circular"
  },
  content: {
    backgroundColor: '#7a9f86',
    borderTopColor: '#6b9478',
    borderTopWidth: 1,
  },
  desc: {
    padding: 20,
    paddingVertical: 50,
  },
  listView: {},
  listItem: {
    gap: 10,
  },
  iconBox: {
    marginRight: 8,
  },
  text: {
    paddingVertical: 3,
  },
  leveltitle: {
    fontSize: 15
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingHorizontal: 30,
    gap: 10,
    paddingTop: 80,
    paddingBottom: 20
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
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  mtitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
