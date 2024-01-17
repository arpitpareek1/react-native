import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import whatsappLogo from './assets/whatsapp.png';
import telegramLogo from './assets/telegram.png';
import CommonHeader from './commonHeader'

const Support = () => {
  function handlePress(path: string) {
    if (path === 'whatsApp') {
      Linking.openURL('https://wa.me/918905608099');
    } else {
      Linking.openURL(`https://t.me/Ansuya_rajput`);
    }
  }
  return (
    <View style={styles.appContent}>
      <CommonHeader title='Support' previousPage='' />
      <View style={styles.row}>
        {/* WhatsApp item */}
        <TouchableOpacity
          onPress={() => handlePress('whatsApp')}
          style={styles.col}>
          <View style={styles.iconedBox}>
            <View style={styles.calls}>
              <View style={styles.iconWrap}>
                <Image
                  source={{
                    uri: Image.resolveAssetSource(whatsappLogo).uri,
                  }}
                  style={styles.image}
                />
              </View>
              <View style={styles.titleCell}>
                <Text style={styles.title}>Whats apps</Text>
              </View>
            </View>
            <Text style={styles.description}>
              Have a question or need support? Reach out to us on WhatsApp for quick and personalized assistance.
            </Text>
            <Text style={styles.description}>
              Simply send a message to our dedicated support number
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Telegram item */}
        <TouchableOpacity
          onPress={() => handlePress('telegram')}
          style={styles.col}>
          <View style={styles.iconedBox}>
            <View style={styles.calls}>
              <View style={styles.iconWrap}>
                <Image
                  source={{
                    uri: Image.resolveAssetSource(telegramLogo).uri,
                  }}
                  style={styles.image}
                />
              </View>
              <View style={styles.titleCell}>
                <Text style={styles.title}>Telegrams</Text>
              </View>
            </View>
            <Text style={styles.description}>
              Join our Telegram community for real-time updates, discussions, and support.
            </Text>
            <Text style={styles.description}>
              Our team is ready to assist you. Join now.
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  appContent: {
  },
  image: {
    width: 70,
    height: 70,
  },
  row: {
    marginTop: 50
  },
  col: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#cccccc',
    marginVertical: 10,
    marginHorizontal: 20
  },
  iconedBox: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  calls: {
    flexDirection: 'row',
    alignItem: 'center',
    paddingVertical: 15
  },
  iconWrap: {
    // Add your styles here
  },
  title: {
    color: "#000",
    padding: 10,
    fontWeight: 500,
    fontSize: 20
  },
  titleCell: {
    flexDirection: 'row', alignItems: 'center',
  },
  description: {
    color: "#000"
    // Add your styles here
  },
  divider: {
    // Add your styles here
  },
};

export default Support;
