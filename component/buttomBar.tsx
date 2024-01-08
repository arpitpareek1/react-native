import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
const BottomNavigation: React.FC<{
  navigation: (r: string) => void
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
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateTo('Products')}
          style={styles.navItem}>
          <Text style={styles.navText}>Products</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateTo('Team')}
          style={styles.navItem}>
          <Text style={styles.navText}>Team</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateTo('Personal')}
          style={styles.navItem}>
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
    borderTopColor: '#ccc',
    height: 60,
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#000',
  },
});

export default BottomNavigation;
