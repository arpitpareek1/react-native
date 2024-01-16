import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';

export default function CustomButton({ label, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#7a9f86',
        padding: responsiveWidth(3),
        marginHorizontal:20,
        borderRadius: 100,
        marginBottom: responsiveWidth(15),
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '500',
          fontSize: 16,
          color: '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
