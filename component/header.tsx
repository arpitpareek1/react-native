// Header.tsx
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import { StackHeaderProps } from '@react-navigation/stack';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
