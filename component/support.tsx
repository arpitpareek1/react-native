import React from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';

const Support = () => {
  function handlePress(path: string) {
    if (path === 'whatsApp') {
      Linking.openURL('https://wa.me/919950929557');
    } else {
      Linking.openURL(`https://t.me/Ansuya_rajput`);
    }
  }
  return (
    <View style={styles.appContent}>
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
                    uri: 'https://www.trumpfe.com/static/img/whatsapp.svg',
                  }}
                  style={styles.image}
                />
              </View>
              <Text style={styles.title}>Whats apps</Text>
            </View>
            <Text style={styles.description}>
              The first contact, the account manager will provide you with
              professional and fast service
            </Text>
            <Text style={styles.description}>
              First contact with account manager via WHATSAPP wins 5rs
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
                    uri: '	https://www.trumpfe.com/static/img/telegram.svg',
                  }}
                  style={styles.image}
                />
              </View>
              <Text style={styles.title}>Telegrams</Text>
            </View>
            <Text style={styles.description}>
              If you don’t have WHATSAPP, you can contact your account manager
              via Telegram, which will do for you
            </Text>
            <Text style={styles.description}>
              First contact with account manager via WHATSAPP wins 5rs
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
  image:{
    width: 30,
    height: 30,
    backgroundColor:"#333333"
  },
  row: {
    // Add your styles here
  },
  col: {
    // Add your styles here
  },
  iconedBox: {
    // Add your styles here
  },
  calls: {
    // Add your styles here
  },
  iconWrap: {
    // Add your styles here
  },
  title: {
    color:"#000"
    // Add your styles here
  },
  description: {
    color:"#000"
    // Add your styles here
  },
  divider: {
    // Add your styles here
  },
};

export default Support;
