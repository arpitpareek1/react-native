import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import RNQRGenerator from 'rn-qr-generator';
import CommonHeader from './commonHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserObjType } from '../interfaces';
import Share from 'react-native-share';


const Refferer = () => {
  const [qrData, setQrData] = useState('');
  const [qrComp, setQrComp] = useState(false);
  const [user, setUser] = useState<null | UserObjType>(null)

  useEffect(() => {
    AsyncStorage.getItem("user").then((result) => {
      const user = JSON.parse(result!)
      console.log(user.referralCode)
      setUser(user)
      RNQRGenerator.generate({
        value: "https://www.riotinto.in/",
        height: 100,
        width: 100,
        correctionLevel: 'H',
        base64: true,
      }).then(response => {
        const { base64 } = response;
        setQrData('data:image/png;base64,' + base64);
      })
        .catch(error => console.log('Cannot create QR code', error));
    })
  }, []);

  const handleCopyPress = () => {
    Clipboard.setString(
      user?.referralCode ?? "",
    );
    Alert.alert('Alert', 'Refer Code has been copied');
  };

  const shareText = async () => {
    try {
      const shareOptions = {
        title: 'Share via',
        message: 'Hello, check out this site, I earn a lot from it!',
        url: 'https://www.riotinto.in/', // Optional, you can include a URL
      };

      Share.open(shareOptions).then((hello) => {
        console.log("suck ses", hello);

      }).catch((hello) => {
        console.log("suck ses", hello);

      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <View>
      <CommonHeader title="Refer a friend" previousPage="" />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.referImage}>
            <Image
              source={{
                uri: 'https://img.freepik.com/free-vector/refer-friend-concept-illustration_114360-7039.jpg',
              }}
              style={{
                width: Dimensions.get('window').width / 2,
                height: Dimensions.get('window').width / 2,
              }}
            />
          </View>
          <View>
            <Text style={{ color: 'black', padding: 20 }}>
              Refer Your Friends & Family
            </Text>
          </View>
          <View style={styles.referCodebar}>
            <View style={styles.codeArea}>
              <View>
                <Text style={{ color: 'black', fontWeight: 'bold' }}>
                  {user?.referralCode}
                </Text>
              </View>

              <TouchableOpacity onPress={() => handleCopyPress()}>
                <View>
                  <Text style={{ color: '#7a9f86', fontWeight: 'bold' }}>
                    Copy
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.openQR}>
              <Button
                title="Show QR"
                color={'#7a9f86'}
                onPress={() => setQrComp(true)}></Button>
            </View>
          </View>
          {qrComp ? (
            <View style={styles.qrcodeComponent}>
              <View style={styles.qrComponentChile}>
                <View>
                  <View>
                    <Text
                      style={{
                        color: 'black',
                        textAlign: 'center',
                        fontWeight: '500',
                        fontSize: 16,
                        paddingBottom: 10,
                      }}>
                      Scan the below QR code
                    </Text>
                  </View>
                  {qrData ? (
                    <Image
                      source={{
                        uri: qrData,
                      }}
                      style={styles.shareQrcode}
                      onError={error =>
                        console.error('Error loading image:', error)
                      }
                    />
                  ) : (
                    <Text>"not"</Text>
                  )}
                </View>
                <View>
                  <Text
                    style={styles.qrclose}
                    onPress={() => {
                      setQrComp(false);
                    }}>
                    Close
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View></View>
          )}
          <View style={{
            padding: 25
          }}>
            <Button color={'#7a9f86'} title='share the app' onPress={shareText} />
          </View>
          <View
            style={{
              paddingTop: 50,
              marginTop: 50,
              borderTopColor: 'black',
              borderTopWidth: 1,
            }}>
            <View>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  fontWeight: '500',
                  fontSize: 15,
                }}>
                How Referrals Work
              </Text>
            </View>
            <View style={{ gap: 10, paddingVertical: 20 }}>
              <Text style={{ color: '#000', fontWeight: '400', fontSize: 14 }}>
                1. Share you referral code.
              </Text>
              <Text style={{ color: '#000', fontWeight: '400', fontSize: 14 }}>
                2. Ensure they apply referral code at Sign Up page.
              </Text>
              <Text style={{ color: '#000', fontWeight: '400', fontSize: 14 }}>
                3. After successfully sign up both will get 100 Points.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    paddingVertical: 50,
  },
  referImage: {},
  referCodebar: {
    flexDirection: 'row',
    gap: 10,
  },
  codeArea: {
    flexDirection: 'row',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 15,
    gap: 50,
  },
  openQR: {
    padding: 5
  },
  shareQrcode: {
    width: 250,
    height: 250,
  },
  qrcodeComponent: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top: 0,
    alignItems: 'center',
    paddingTop: 100,
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 1,
  },
  qrComponentChile: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    gap: 10,
    flexDirection: 'column',
  },
  qrclose: {
    color: 'white',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 100,
    textAlign: 'center',
    fontWeight: '500',
    width: 100,
  },
});

export default Refferer;
