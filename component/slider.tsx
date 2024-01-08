import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import DefaultImage1 from './assets/RiotintoBanner1.jpg';
import DefaultImage2 from './assets/RiotintoBanner2.jpg';
import DefaultImage3 from './assets/RiotintoBanner3.jpg';
import DefaultImage4 from './assets/RiotintoBanner4.jpg';
import DefaultImage5 from './assets/RiotintoBanner5.jpg';
import DefaultImage6 from './assets/RiotintoBanner6.jpg';
import DefaultImage7 from './assets/RiotintoBanner7.jpg';
import DefaultImage8 from './assets/RiotintoBanner8.jpg';

const ImageSlider = () => {
  return (
    <View style={{ padding: 20, position: 'absolute', marginTop: 60 }}>
      <Swiper showsButtons={false} dot={false} height={180} >
        <View style={styles.slide}>
          <Image
            source={{
              uri: Image.resolveAssetSource(DefaultImage1).uri,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={{
              uri: Image.resolveAssetSource(DefaultImage2).uri,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={{
              uri: Image.resolveAssetSource(DefaultImage3).uri,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={{
              uri: Image.resolveAssetSource(DefaultImage4).uri,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={{
              uri: Image.resolveAssetSource(DefaultImage5).uri,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={{
              uri: Image.resolveAssetSource(DefaultImage6).uri,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={{
              uri: Image.resolveAssetSource(DefaultImage7).uri,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={{
              uri: Image.resolveAssetSource(DefaultImage8).uri,
            }}
            style={styles.image}
          />
        </View>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    maxHeight: '30%',
    height: '30%',
    borderCurve: 'continuous',
  },
  slide: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
// position: relative;
// z-index: 1;
// width: 100%;
// height: 170px;
// background-size: cover;
// background-position: center center;
// border-radius: 10px;
// overflow: hidden;

export default ImageSlider;
