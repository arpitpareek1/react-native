import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from './header';
import IconRow from './iconRow';
import ImageSlider from './slider';
import BottomNavigation from './buttomBar';
import {
  NewsItemProps,
  ProductType,
  SupportProps,
} from '../interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backend_url, handle500Error } from './helper';
import ProductItem from './commons/productItem';
import axios from 'axios';
import Loader from './commons/Loader';
import DefaultImage1 from './assets/spin.png';


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
  const [productsData, setProductsData] = useState<null | ProductType[]>(null)
  const [newsData, setNewsData] = useState<null | any>(null)


  useEffect(() => {
    AsyncStorage.getItem('user', (error, result) => {
      if (typeof result !== "string") {
        navigation.navigate('LoginScreen');
        return
      }
    });

    axios.get(backend_url + "/api/v1/user/getAllProduct").then(({ data }) => {
      setProductsData(data)
    }).catch((error) => {
      handle500Error(error.message)
  })

    axios.get(backend_url + "/api/v1/user/getAllNewsData").then(({ data }) => {
      setNewsData(data)
    }).catch((error) => {
      handle500Error(error.message)
  })

  }, []);
  return (
    <>
      <ScrollView>
        <Header title="Home" />
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
        <View>

          {productsData ? productsData.map(
            (product: ProductType, index: number) =>
              index < 5 && (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.navigate('ViewProduct', {
                      dailyIncome: product.dailyIncome,
                      imageSource: product.imageSource,
                      isHot: true,
                      price: product.price,
                      purchaseLimit: product.purchaseLimit,
                      title: product.title,
                      validityPeriod: product.validity,
                      desc: product.desc
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
          ) : <Loader visible={true} />}
        </View>
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
        <View>

          {newsData ? newsData.map(
            (news: { category: string; date: string; imageSource: string; }, index: number) =>
              index < 3 && (
                <NewsItem
                  key={index}
                  category={news.category}
                  date={news.date}
                  imageSource={news.imageSource}
                />
              ),
          ) : <Loader visible={true} />}
        </View>

        <View
          style={{
            paddingBottom: 100,
          }}></View>
      </ScrollView>

      <TouchableOpacity onPress={() => { navigation.navigate('LuckySpinner') }}>
        <View style={{ position: 'absolute', right: 12, bottom: 75, backgroundColor: '#7a9f86', borderRadius: 10, padding: 8 }}>
          <Image source={{ uri: Image.resolveAssetSource(DefaultImage1).uri }} style={{ width: 40, height: 40 }} />
        </View>
      </TouchableOpacity>

      <BottomNavigation navigation={navigation.navigate} />
    </>
  );
};

export default HomeScreen;
