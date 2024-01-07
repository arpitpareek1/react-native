import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';

const ImageSlider = () => {
  return (
    <Swiper showsButtons={false} dot={false} height={250}>
      <View style={styles.slide}>
        <Image
          source={{
            uri: 'https://images.freeimages.com/images/large-previews/aed/three-bees-on-sunflower-1337029.jpg',
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.slide}>
        <Image
          source={{
            uri: 'https://images.freeimages.com/images/large-previews/aed/three-bees-on-sunflower-1337029.jpg',
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.slide}>
        <Image
          source={{
            uri: 'https://images.freeimages.com/images/large-previews/aed/three-bees-on-sunflower-1337029.jpg',
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.slide}>
        <Image
          source={{
            uri: 'https://images.freeimages.com/images/large-previews/aed/three-bees-on-sunflower-1337029.jpg',
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.slide}>
        <Image
          source={{
            uri: 'https://images.freeimages.com/images/large-previews/aed/three-bees-on-sunflower-1337029.jpg',
          }}
          style={styles.image}
        />
      </View>
    </Swiper>
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
    borderRadius: 1,
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
