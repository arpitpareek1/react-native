import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Button, StyleSheet, ScrollView, Image} from 'react-native';
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

        const {uri, base64} = response;
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
      <View style={styles.container}>
        <View style={styles.yaoqing}>
          <View style={styles.container}>
            <View style={styles.demo}>
              <View style={styles.copyCode}>
                <Text style={[styles.mt5, styles.titleColor]}>
                  My invitation code
                </Text>
                <Text style={styles.inviteCode}>{'gdjsgkd'}</Text>
              </View>
            </View>
          </View>
        </View>

        <Button title="Copy" onPress={handleCopyPress} />
        <View>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  mt5: {
    marginTop: 5,
  },
  titleColor: {
    color: '#8B31E4',
    opacity: 0.4,
  },
  inviteCode: {
    marginTop: 5,
    color: '#8B31E4',
    opacity: 0.4,
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
