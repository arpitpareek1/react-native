import React, {useEffect, useState} from 'react';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Refferer = () => {
  const [qrData, setQrData] = useState('');
  const [qrComp, setQrComp] = useState(false);
  const [reffe_code, setReferCode] = useState('SDEFSAZ');

  useEffect(() => {
    RNQRGenerator.generate({
      value: 'https://github.com/gevgasparyan/rn-qr-generator',
      height: 100,
      width: 100,
      correctionLevel: 'L',
      base64: true,
    })
      .then(response => {
        const {uri, base64} = response;
        setQrData('data:image/png;base64,' + base64);
      })
      .catch(error => console.log('Cannot create QR code', error));
  }, []);

  const handleCopyPress = () => {
    Clipboard.setString(
      `https://www.trumpfe.com/index/auth/signup/invitecode/gdjsgkd`,
    );
    Alert.alert('Alert', 'Reffer Code has been copied');
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
            <Text style={{color: 'black', padding: 20}}>
              Refer Your Friends & Family
            </Text>
          </View>
          <View style={styles.referCodebar}>
            <View style={styles.codeArea}>
              <View>
                <Text style={{color: 'black', fontWeight: 'bold'}}>
                  {reffe_code}
                </Text>
              </View>

              <TouchableOpacity onPress={() => handleCopyPress()}>
                <View>
                  <Text style={{color: '#7a9f86', fontWeight: 'bold'}}>
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
                How referrals work
              </Text>
            </View>
            <View style={{gap: 10, paddingVertical: 20}}>
              <Text style={{color: '#000', fontWeight: '400', fontSize: 14}}>
                1. Share you referral code
              </Text>
              <Text style={{color: '#000', fontWeight: '400', fontSize: 14}}>
                2. Ensure they apply referral code at Sign Up page
              </Text>
              <Text style={{color: '#000', fontWeight: '400', fontSize: 14}}>
                3. How referrals work
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
