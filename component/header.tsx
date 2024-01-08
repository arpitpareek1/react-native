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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#7a9f86',
    height: 180
  },
  backButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'normal'
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  walletContainer: {
    flexDirection: 'row',
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
