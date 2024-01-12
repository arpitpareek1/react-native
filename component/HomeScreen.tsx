import React, { useEffect } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from './header';
import IconRow from './iconRow';
import ImageSlider from './slider';
import BottomNavigation from './buttomBar';
import {
  GoodItemProps,
  ProductItemProps,
  NewsItemProps,
  SupportProps,
} from '../interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { newsData, productsData } from './helper';
import ProductItem from './commons/productItem';

const NewsItem: React.FC<NewsItemProps> = ({ imageSource, category, date }) => (
  <View
    style={{
      flexDirection: 'row',
      paddingHorizontal: 15,
      paddingVertical: 10,
      gap: 10,
    }}>
    <View style={{ borderRadius: 10, overflow: 'hidden', height: 70 }}>
      <Image source={{ uri: imageSource }} style={{ width: 70, height: 70 }} />
    </View>
    <View style={{ padding: 2, width: Dimensions.get('window').width - 115 }}>
      <Text style={{ fontSize: 16, color: '#000' }}>{category}</Text>
      <Text style={{ paddingVertical: 5, fontSize: 12, color: '#000' }}>
        {date}
      </Text>
    </View>
  </View>
);

const HomeScreen: React.FC<SupportProps> = ({ navigation }) => {
  useEffect(() => {
    AsyncStorage.getItem('user', (error, result) => {
      console.log(error, result);
      if (!result) {
        // navigation.navigate('LoginScreen');
      }
    });
  }, []);
  return (
    <>
      <ScrollView>
        <Header title="Home" walletNumber={100} />
        <ImageSlider />
        <IconRow navigation={navigation.navigate} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 15,
          }}>
          <View>
            <Text style={{ color: 'black', fontSize: 28, fontWeight: '700' }}>
              Products
            </Text>
            <Text style={{ color: '#8D95A0', fontSize: 14 }}>Overview</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AllProductList');
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#8B31E4', fontWeight: '400', fontSize: 14 }}>
                View All
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {productsData.map(
          (product, index) =>
            index < 5 && (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate('ViewProduct', {
                    dailyIncome: '112.8',
                    imageSource: product.imageSource,
                    isHot: true,
                    price: product.price,
                    purchaseLimit: '2 / person',
                    title: product.title,
                    validityPeriod: '48 / Days',
                  });
                }}>
                <ProductItem
                  key={index}
                  imageSource={product.imageSource}
                  link={product.link}
                  price={product.price}
                  title={product.title}
                />
              </TouchableOpacity>
            ),
        )}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 15,
            paddingTop: 50,
          }}>
          <View>
            <Text style={{ color: 'black', fontSize: 28, fontWeight: '700' }}>
              Today
            </Text>
            <Text style={{ color: '#8D95A0', fontSize: 14 }}>NEWS</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('AllNewsList')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#8B31E4', fontWeight: '400', fontSize: 14 }}>
                View All
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {newsData.map(
          (news, index) =>
            index < 3 && (
              <NewsItem
                key={index}
                category={news.category}
                date={news.date}
                imageSource={news.imageSource}
              />
            ),
        )}
        <View
          style={{
            paddingBottom: 100,
          }}></View>
      </ScrollView>
      <BottomNavigation navigation={navigation.navigate} />
    </>
  );
};

export default HomeScreen;
