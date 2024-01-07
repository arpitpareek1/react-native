import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Header from './header';
import IconRow from './iconRow';
import ImageSlider from './slider';
import {GoodItemProps, ProductItemProps, NewsItemProps} from '../interfaces';

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
  <View style={{marginVertical: 10, paddingHorizontal: 20}}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{marginRight: 10}}>
          <Image source={{uri: imageSource}} style={{width: 50, height: 50}} />
        </View>
        <View>
          <Text style={{fontSize: 16, width: 100, color: '#888'}}>{title}</Text>
        </View>
      </View>
      {isHot && (
        <Text style={{fontStyle: 'italic', width: 100, color: '#888'}}>
          Hot
        </Text>
      )}
    </View>

    <View style={{marginTop: 10}}>
      <View style={{flexDirection: 'row', marginBottom: 5}}>
        <Text style={{width: 100, color: '#888'}}>Price</Text>
        <Text style={{width: 100, color: '#888'}}>{price}</Text>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 5}}>
        <Text style={{width: 100, color: '#888'}}>Daily income</Text>
        <Text style={{width: 100, color: '#888'}}>{dailyIncome}</Text>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 5}}>
        <Text style={{width: 100, color: '#888'}}>Validity period</Text>
        <Text style={{width: 100, color: '#888'}}>{validityPeriod}</Text>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 5}}>
        <Text style={{width: 100, color: '#888'}}>Purchase limit</Text>
        <Text style={{width: 100, color: '#888'}}>{purchaseLimit}</Text>
      </View>
    </View>

    <TouchableOpacity onPress={() => {}} style={{marginTop: 10}}>
      <Text
        style={{color: 'blue'}}
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
  <TouchableOpacity onPress={() => {}}>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
      }}>
      <View style={{flex: 1}}>
        <Image source={{uri: imageSource}} style={{width: 50, height: 50}} />
      </View>
      <View style={{flex: 3}}>
        <Text style={{fontSize: 14, color: '#000', marginBottom: 5}}>
          {title}
        </Text>
        <Text style={{fontSize: 12, fontWeight: 'bold', color: '#000'}}>
          {price}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const NewsItem: React.FC<NewsItemProps> = ({imageSource, category, date}) => (
  <TouchableOpacity onPress={() => {}}>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
      }}>
      <View style={{flex: 1}}>
        <Image source={{uri: imageSource}} style={{width: 50, height: 50}} />
      </View>
      <View style={{flex: 3}}>
        <Text
          style={{
            fontSize: 16,
            color: '#000',
            marginTop: 12,
            marginLeft: 20,
          }}>
          {category}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: '#000',
            marginLeft: 20,
            marginTop: 12,
          }}>
          {date}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);
const HomeScreen = ({navigation}) => {
  return (
    <ScrollView>
      <Header title="Home" walletNumber={100} />
      <ImageSlider />
      <IconRow navigation={navigation.navigate} />
      <ProductItem
        imageSource="https://images.freeimages.com/variants/YSotMxjHEvoFiBGaZkkJv5K8/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d"
        link="https://images.freeimages.com/variants/YSotMxjHEvoFiBGaZkkJv5K8/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d"
        price="ff"
        title="hello"
      />
      <NewsItem
        category="hhh"
        date="hh"
        imageSource="https://images.freeimages.com/variants/YSotMxjHEvoFiBGaZkkJv5K8/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d"
      />
      <NewsItem
        category="hhh"
        date="hh"
        imageSource="https://images.freeimages.com/variants/YSotMxjHEvoFiBGaZkkJv5K8/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d"
      />
      <NewsItem
        category="hhh"
        date="hh"
        imageSource="https://images.freeimages.com/variants/YSotMxjHEvoFiBGaZkkJv5K8/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d"
      />
      <NewsItem
        category="hhh"
        date="hh"
        imageSource="https://images.freeimages.com/variants/YSotMxjHEvoFiBGaZkkJv5K8/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d"
      />
      <ListItem
        dailyIncome="11"
        imageSource="https://images.freeimages.com/variants/YSotMxjHEvoFiBGaZkkJv5K8/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d"
        isHot
        price="fujk"
        purchaseLimit="kjshfj"
        title="fdhjfhd"
        validityPeriod="jjdjd"
        navigate={navigation.navigate}
      />
    </ScrollView>
  );
};
export default HomeScreen;
