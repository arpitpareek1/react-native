import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
// import {SvgXml} from 'react-native-svg';
import DefaultImage1 from './assets/tab1.png';
import DefaultImage2 from './assets/tab2.png';
import DefaultImage3 from './assets/tab3.png';
import DefaultImage4 from './assets/tab4.png';

interface IconRow {
  navigation: any;
}

const IconRow: React.FC<IconRow> = ({ navigation }) => {
  return (
    <View style={styles.palaceContainer}>
      <TouchableOpacity style={styles.palaceGrid} onPress={() => {
        navigation("CliamReward")
      }}>
        <View style={styles.palaceGridIcon}>
          <Image source={{ uri: Image.resolveAssetSource(DefaultImage1).uri }} style={{ width: 50, height: 50 }} />
        </View>
        <View style={styles.palaceGridText}>
          <Text style={styles.gridText}>Points</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.palaceGrid} onPress={() => {
        navigation("AboutUs")
      }}>
        <View style={styles.palaceGridIcon}>
          <Image source={{ uri: Image.resolveAssetSource(DefaultImage2).uri }} style={{ width: 50, height: 50 }} />
        </View>
        <View style={styles.palaceGridText}>
          <Text style={styles.gridText}>About</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.palaceGrid}
        onPress={() => {
          navigation('Refferer');
        }}>
        <View style={styles.palaceGridIcon}>
          <Image source={{ uri: Image.resolveAssetSource(DefaultImage3).uri }} style={{ width: 50, height: 50 }} />
        </View>
        <View style={styles.palaceGridText}>
          <Text style={styles.gridText}>Refer</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.palaceGrid}
        onPress={() => {
          navigation('Support');
        }}>
        <View style={styles.palaceGridIcon}>
          <Image source={{ uri: Image.resolveAssetSource(DefaultImage4).uri }} style={{ width: 50, height: 50 }} />
        </View>
        <View style={styles.palaceGridText}>
          <Text style={styles.gridText}>Services</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  palaceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 2,
    marginTop: 100,
  },
  palaceGrid: {
    alignItems: 'center',
    width: '25%'
  },
  palaceGridIcon: {
    marginBottom: 5,
    borderRadius: 200,
  },
  iconImage: {
    width: 50,
    height: 50,
  },
  palaceGridText: {
  },
  gridText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#000',
    textAlign: 'center'
  },
});

export default IconRow;
