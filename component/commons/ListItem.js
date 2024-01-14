import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

const ListItem = ({
  imageSource,
  title,
  isHot,
  price,
  dailyIncome,
  validityPeriod,
  purchaseLimit,
  navigate,
  desc
}) => (
  <View
    style={{
      margin: 20,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      borderColor: '#7a9f86',
      borderWidth: 1
    }}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View style={{ borderRadius: 10, overflow: 'hidden' }}>
          <Image source={{ uri: imageSource }} style={{ width: 60, height: 60 }} />
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              width: Dimensions.get('window').width - 150,
              color: '#000',
            }}>
            {title}
          </Text>
        </View>
      </View>
      {isHot && (
        <Text
          style={{
            position: 'absolute',
            fontStyle: 'italic',
            color: '#fff',
            marginTop: -20,
            right: -20,
            backgroundColor: '#7a9f86',
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderBottomLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          Hot
        </Text>
      )}
    </View>

    <View style={{ margin: 10, gap: 5 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ width: 100, color: '#888' }}>Price</Text>
        <Text
          style={{
            width: 100,
            color: '#000',
            fontWeight: '500',
            textAlign: 'right',
          }}>
          {price}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ width: 100, color: '#888' }}>Daily income</Text>
        <Text
          style={{
            width: 100,
            color: '#000',
            fontWeight: '500',
            textAlign: 'right',
          }}>
          {dailyIncome}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ width: 100, color: '#888' }}>Validity period</Text>
        <Text
          style={{
            width: 100,
            color: '#000',
            fontWeight: '500',
            textAlign: 'right',
          }}>
          {validityPeriod}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ width: 100, color: '#888' }}>Purchase limit</Text>
        <Text
          style={{
            width: 100,
            color: '#000',
            fontWeight: '500',
            textAlign: 'right',
          }}>
          {purchaseLimit}
        </Text>
      </View>
    </View>

    <TouchableOpacity onPress={() => { }} style={{ marginTop: 20 }}>
      <Text
        style={{
          color: '#fff',
          backgroundColor: '#7a9f86',
          textAlign: 'center',
          padding: 10,
          borderRadius: 20,
          fontWeight: '600',
        }}
        onPress={() => {
          navigate('ViewProduct', {
            imageSource,
            title,
            isHot,
            price,
            dailyIncome,
            validityPeriod,
            purchaseLimit,
            desc
          });
        }}>
        View
      </Text>
    </TouchableOpacity>
  </View>
);

export default ListItem;
