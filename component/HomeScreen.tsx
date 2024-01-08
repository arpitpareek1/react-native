import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from './header';
import IconRow from './iconRow';
import ImageSlider from './slider';
import BottomNavigation from './buttomBar';
import { GoodItemProps, ProductItemProps, NewsItemProps, SupportProps } from '../interfaces';
import { Directions } from 'react-native-gesture-handler';

const ListItem: React.FC<GoodItemProps> = ({
  imageSource,
  title,
  isHot,
  price,
  dailyIncome,
  validityPeriod,
  purchaseLimit,
  navigate,
}) => (
  <View style={{ margin: 20, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View style={{ borderRadius: 10, overflow: 'hidden' }}>
          <Image source={{ uri: imageSource }} style={{ width: 60, height: 60 }} />
        </View>
        <View>
          <Text style={{ fontSize: 16, width: Dimensions.get('window').width - 150, color: '#000' }}>{title}</Text>
        </View>
      </View>
      {isHot && (
        <Text style={{ position: 'absolute', fontStyle: 'italic', color: '#fff', marginTop: -20, right: -20, backgroundColor: '#1DC62E', paddingHorizontal: 15, paddingVertical: 5, borderBottomLeftRadius: 10, borderTopRightRadius: 10 }}>
          Hot
        </Text>
      )}
    </View>

    <View style={{ margin: 10, gap: 5 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ width: 100, color: '#888' }}>Price</Text>
        <Text style={{ width: 100, color: '#000', fontWeight: '500', textAlign: 'right' }}>{price}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ width: 100, color: '#888' }}>Daily income</Text>
        <Text style={{ width: 100, color: '#000', fontWeight: '500', textAlign: 'right' }}>{dailyIncome}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ width: 100, color: '#888' }}>Validity period</Text>
        <Text style={{ width: 100, color: '#000', fontWeight: '500', textAlign: 'right' }}>{validityPeriod}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ width: 100, color: '#888' }}>Purchase limit</Text>
        <Text style={{ width: 100, color: '#000', fontWeight: '500', textAlign: 'right' }}>{purchaseLimit}</Text>
      </View>
    </View>

    <TouchableOpacity onPress={() => { }} style={{ marginTop: 20 }}>
      <Text
        style={{ color: '#6b9478', backgroundColor: '#e1eae4', textAlign: 'center', padding: 10, borderRadius: 20, fontWeight: "600" }}
        onPress={() => {
          navigate('ViewProduct');
        }}>
        View
      </Text>
    </TouchableOpacity>
  </View>
);

const ProductItem: React.FC<ProductItemProps> = ({
  imageSource,
  title,
  price,
}) => (
  <TouchableOpacity onPress={() => { }}>
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10
      }}>
      <View style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, overflow: 'hidden', height: 130 }}>
        <Image source={{ uri: imageSource }} style={{ width: 130, height: 130 }} />
      </View>
      <View style={{ padding: 10, width: Dimensions.get('window').width - 160, backgroundColor: '#e1eae4', borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: '500', color: '#000' }}>
          {title}
        </Text>
        <Text style={{ paddingVertical: 8, fontSize: 14, color: '#000' }}>
          {price}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const NewsItem: React.FC<NewsItemProps> = ({ imageSource, category, date }) => (
  <TouchableOpacity onPress={() => { }}>
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
        gap: 10
      }}>
      <View style={{ borderRadius: 10, overflow: 'hidden', height: 70 }}>
        <Image source={{ uri: imageSource }} style={{ width: 70, height: 70 }} />
      </View>
      <View style={{ padding: 2, width: Dimensions.get('window').width - 115 }}>
        <Text
          style={{ fontSize: 16, color: '#000' }}>
          {category}
        </Text>
        <Text
          style={{ paddingVertical: 5, fontSize: 12, color: '#000' }}>
          {date}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);
const HomeScreen:React.FC<SupportProps> = ({ navigation }) => {
  return (
    <ScrollView>
      <Header title="Home" walletNumber={100} />
      <ImageSlider />
      <IconRow navigation={navigation.navigate} />
      <BottomNavigation navigation={navigation.navigate} />


      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 15 }}>
        <View>
          <Text style={{ color: 'black', fontSize: 28, fontWeight: '700' }}>Products</Text>
          <Text style={{ color: '#8D95A0', fontSize: 14 }}>Overview</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: '#8B31E4', fontWeight: '400', fontSize: 14 }}>View All</Text>
        </View>
      </View>
      <ProductItem
        imageSource="https://www.trumpfe.com/uploads/20231231/c1bd5a3f94c86a1ffd054fe807dab065.png"
        link="https://www.trumpfe.com/uploads/20231231/c1bd5a3f94c86a1ffd054fe807dab065.png"
        price="8500"
        title=" Premium 3D printing (TruPrint 3000)"
      />
      <ProductItem
        imageSource="https://www.trumpfe.com/uploads/20231231/af58a72d4a2a1cfc2eab779edacb6cad.png"
        link="https://www.trumpfe.com/uploads/20231231/af58a72d4a2a1cfc2eab779edacb6cad.png"
        price="85000"
        title=" Premium 3D printing (TruPrint 3000)"
      />
      <ProductItem
        imageSource="https://www.trumpfe.com/uploads/20231231/13f6c68f1e589d6057159f311df08ee0.png"
        link="https://www.trumpfe.com/uploads/20231231/13f6c68f1e589d6057159f311df08ee0.png"
        price="85000"
        title=" Premium 3D printing (TruPrint 3000)"
      />
      <ProductItem
        imageSource="https://www.trumpfe.com/uploads/20231231/25986e69c288fbad250182daaa4c96ba.png"
        link="https://www.trumpfe.com/uploads/20231231/25986e69c288fbad250182daaa4c96ba.png"
        price="85000"
        title=" Premium 3D printing (TruPrint 3000)"
      />
      <ProductItem
        imageSource="https://www.trumpfe.com/uploads/20231231/a8508bc95a3c91de574cd7bfd3642c76.png"
        link="https://www.trumpfe.com/uploads/20231231/a8508bc95a3c91de574cd7bfd3642c76.png"
        price="85000"
        title=" Premium 3D printing (TruPrint 3000)"
      />
      <ProductItem
        imageSource="https://www.trumpfe.com/uploads/20231231/abe6b99bd33cc5600a8d4f48fb6e2350.png"
        link="https://www.trumpfe.com/uploads/20231231/abe6b99bd33cc5600a8d4f48fb6e2350.png"
        price="85000"
        title=" Premium 3D printing (TruPrint 3000)"
      />

      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 15, paddingTop: 50 }}>
        <View>
          <Text style={{ color: 'black', fontSize: 28, fontWeight: '700' }}>Today</Text>
          <Text style={{ color: '#8D95A0', fontSize: 14 }}>NEWS</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: '#8B31E4', fontWeight: '400', fontSize: 14 }}>View All</Text>
        </View>
      </View>
      <NewsItem
        category="Announcement - Any rendom text here."
        date="19/10/23 13:30:19"
        imageSource="https://www.trumpfe.com/uploads/20231019/22b42e965adfef7027580f307cfb2d6e.jpg"
      />
      <NewsItem
        category="Announcement - Any rendom text here."
        date="19/10/23 13:30:19"
        imageSource="https://www.trumpfe.com/uploads/20231001/7838d553d56635152aab23391e66e158.jpg"
      />
      <NewsItem
        category="Announcement - Any rendom text here."
        date="19/10/23 13:30:19"
        imageSource="https://www.trumpfe.com/uploads/20231001/b99ac897e81079cb2e5d7ef25f0306fc.jpg"
      />
      <NewsItem
        category="Announcement - Any rendom text here."
        date="19/10/23 13:30:19"
        imageSource="https://www.trumpfe.com/uploads/20231019/22b42e965adfef7027580f307cfb2d6e.jpg"
      />


      <ListItem
        dailyIncome="112.8"
        imageSource="https://www.trumpfe.com/uploads/20231231/13f6c68f1e589d6057159f311df08ee0.png"
        isHot
        price="2350 Rs"
        purchaseLimit="2 / person"
        title="Focusing optics (BEO D25)"
        validityPeriod="48 / Days"
        navigate={navigation.navigate}
      />
    </ScrollView>
  );
};


export default HomeScreen;
