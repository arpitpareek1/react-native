import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import RNQRGenerator from 'rn-qr-generator';

const Refferer = () => {
  // const inviteCode = 'gdjsgkd';

  const [qrData, setQrData] = useState('');

  useEffect(() => {
    RNQRGenerator.generate({
      value: 'https://github.com/gevgasparyan/rn-qr-generator',
      height: 100,
      width: 100,
      correctionLevel: 'L',
      base64: true,
    })
      .then(response => {
        // console.log(response, 'res');

        const { uri, base64 } = response;
        // this.setState({ imageUri: uri });
        setQrData('data:image/png;base64,' + base64);
      })
      .catch(error => console.log('Cannot create QR code', error));
  }, []);

  const handleCopyPress = () => {
    Clipboard.setString(
      `https://www.trumpfe.com/index/auth/signup/invitecode/gdjsgkd`,
    );
  };

  return (
    <ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height }}>
        <View>
          <View style={styles.container}>
            <View style={styles.copyCode}>
              <Text style={[styles.mt5, styles.titleColor]}>
                My invitation code
              </Text>
              <Text style={styles.inviteCode}>{'gdjsgkd'}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 25 }}>
              {qrData ? (
                <Image
                  source={{
                    uri: qrData,
                  }}
                  style={styles.shareQrcode}
                  onError={error => console.error('Error loading image:', error)}
                />
              ) : (
                <Text>"not"</Text>
              )}
            </View>
          </View>
          <TouchableOpacity onPress={handleCopyPress}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
              <Text style={{ backgroundColor: '#8B31E4', width: 200, textAlign: 'center', padding: 10, borderRadius: 25, color: 'white', fontWeight: 'bold' }} >COPY</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { width: 12, height: 24 },
    shadowOpacity: 1,
    shadowRadius: 0,  
    elevation: 5,
    padding: 30,
    marginBottom: 50
  },
  yaoqing: {
    marginTop: 5,
  },
  demo: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  copyCode: {
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#bbb',
    borderStyle: 'dashed',
    paddingBottom: 25,
    paddingHorizontal: 30
  },
  mt5: {
    marginTop: 5,
  },
  titleColor: {
    color: '#8B31E4',
    opacity: 0.4,
    fontSize: 18
  },
  inviteCode: {
    marginTop: 5,
    color: '#8B31E4',
    opacity: 0.9,
    fontSize: 50,
    fontWeight: 'bold'
  },
  shareQrcode: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    // marginLeft: 10, // Add margin or adjust as needed
  },
});

export default Refferer;
