import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// const Tab = createBottomTabNavigator();

const BottomNavigation = ({navigation}) => {
  const navigateTo = routeName => {
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
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    height: 60,
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
