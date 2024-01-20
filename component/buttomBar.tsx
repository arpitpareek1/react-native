import React, { useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import DefaultImage1 from './assets/home.png';
import DefaultImage2 from './assets/product.png';
import DefaultImage3 from './assets/group.png';
import DefaultImage4 from './assets/personal.png';

const BottomNavigation: React.FC<{
  navigation: (r: string) => void;
}> = ({ navigation }) => {
  const navigateTo = (routeName: string) => {
    navigation(routeName);
  };
  return (
    <>
      <View style={styles.bottomNavBar}>
        <TouchableOpacity
          onPress={() => navigateTo('Home')}
          style={styles.navItem}>
          <View>
            <Image source={{ uri: Image.resolveAssetSource(DefaultImage1).uri }} style={{ width: 20, height: 20, tintColor: '#7a9f86' }} />
          </View>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateTo('AllProductList')}
          style={styles.navItem}>
          <View>
            <Image source={{ uri: Image.resolveAssetSource(DefaultImage2).uri }} style={{ width: 20, height: 20, tintColor: '#7a9f86' }} />
          </View>
          <Text style={styles.navText}>Products</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateTo('Team')}
          style={styles.navItem}>
          <View>
            <Image source={{ uri: Image.resolveAssetSource(DefaultImage3).uri }} style={{ width: 20, height: 20, tintColor: '#7a9f86' }} />
          </View>
          <Text style={styles.navText}>Team</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateTo('profile')}
          style={styles.navItem}>
          <View>
            <Image source={{ uri: Image.resolveAssetSource(DefaultImage4).uri }} style={{ width: 20, height: 20, tintColor: '#7a9f86' }} />
          </View>
          <Text style={styles.navText}>Personal</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#97b4a1',
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
    paddingVertical: 12,
    paddingTop: 10,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#7a9f86',
    fontWeight: '500',
    paddingTop: 3
  },
});

export default BottomNavigation;
