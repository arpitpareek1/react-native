// Header.tsx
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import { StackHeaderProps } from '@react-navigation/stack';

interface HeaderProps {
  title: string;
  walletNumber: number;
}

const Header: React.FC<HeaderProps> = ({title, walletNumber}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.backButton}>{'Back'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.walletContainer}>
        <Text style={styles.walletIcon}>💰</Text>
        <Text style={styles.walletNumber}>{walletNumber}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#3498db', // Set your desired background color
  },
  backButton: {
    color: 'white',
    fontSize: 20,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  walletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletIcon: {
    marginRight: 5,
    fontSize: 20,
    color: 'white',
  },
  walletNumber: {
    color: 'white',
    fontSize: 16,
  },
});

export default Header;
