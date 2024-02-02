import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import NewsItem from './commons/newsItem';
import CommonHeader from './commonHeader'
import BottomNavigation from './buttomBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { backend_url, handle500Error } from './helper';
import Loader from './commons/Loader';

const AllNewsList: React.FC = ({ navigation }: any) => {
  const [newsData, setNewsData] = useState<null | any>(null)
  useEffect(() => {
    axios.get(backend_url + "/api/v1/user/getAllNewsData").then(({ data }) => {
      console.log(data);
      setNewsData(data)
    }).catch((error) => {
      handle500Error(error.message)
    })
  }, [])
  return (
    <>
      <CommonHeader title='News' previousPage='' />
      <ScrollView>
        <View style={{ paddingTop: 20 }}></View>
        {newsData && newsData.map((news, index) => (
          <TouchableOpacity key={index} onPress={() => {
            navigation.navigate("NewsDetailScreen", news)
          }}>
            <NewsItem
              key={index}
              category={news.category}
              date={news.description.substr(0, 58) + "..."}
              imageSource={news.imageSource}
              title={news.title}
            />
          </TouchableOpacity>
        ))}
        <View style={{marginBottom:60}}></View>

      </ScrollView>
      <Loader visible={!newsData} />
      <BottomNavigation navigation={navigation.navigate} />
    </>
  );
};

export default AllNewsList;
