import React from 'react';
import {NewsItemProps} from '../../interfaces';
import {Dimensions, Image, Text, View} from 'react-native';
const NewsItem: React.FC<NewsItemProps> = ({imageSource, category, date, title}) => (
  <View
    style={{
      flexDirection: 'row',
      paddingHorizontal: 15,
      paddingVertical: 10,
      gap: 10,
    }}>
    <View style={{borderRadius: 10, overflow: 'hidden', height: 70}}>
      <Image source={{uri: imageSource}} style={{width: 70, height: 70}} />
    </View>
    <View style={{padding: 2, width: Dimensions.get('window').width - 115}}>
      <Text style={{fontSize: 16, color: '#000'}}>{title}</Text>
      <Text style={{fontSize: 14, color: '#000'}}>{category}</Text>
      <Text style={{paddingVertical: 5, fontSize: 12, color: '#000'}}>
        {date}
      </Text>
    </View>
  </View>
);

export default NewsItem;
