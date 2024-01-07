import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
// import {SvgXml} from 'react-native-svg';

interface IconRow {
  navigation: any;
}

const IconRow: React.FC<IconRow> = ({navigation}) => {
  return (
    <View style={styles.palaceContainer}>
      <TouchableOpacity style={styles.palaceGrid} onPress={() => {
        navigation("profile")
      }}>
        <View style={styles.palaceGridIcon}></View>
        <View style={styles.palaceGridText}>
          <Text style={styles.gridText}>About</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.palaceGrid} onPress={() => {}}>
        <View style={styles.palaceGridIcon}></View>
        <View style={styles.palaceGridText}>
          <Text style={styles.gridText}>Help</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.palaceGrid}
        onPress={() => {
          navigation('Refferer');
        }}>
        <View style={styles.palaceGridIcon}></View>
        <View style={styles.palaceGridText}>
          <Text style={styles.gridText}>Friends</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.palaceGrid}
        onPress={() => {
          navigation('Support');
        }}>
        <View style={styles.palaceGridIcon}></View>
        <View style={styles.palaceGridText}>
          <Text style={styles.gridText}>Services</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  palaceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  palaceGrid: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  palaceGridIcon: {
    marginBottom: 10,
  },
  iconImage: {
    width: 50,
    height: 50,
  },
  palaceGridText: {},
  gridText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default IconRow;
