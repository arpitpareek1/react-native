import { ScrollView, Text, View } from 'react-native';
import { newsData } from './helper';
import NewsItem from './commons/newsItem';
import CommonHeader from './commonHeader'
import BottomNavigation from './buttomBar';

const AllNewsList: React.FC = ({ navigation }: any) =>{
  return (
    <>
      <CommonHeader title='News' previousPage='' />
      <ScrollView>
        <View style={{ paddingTop: 20 }}></View>
        {newsData.map((news, index) => (
          <NewsItem
            key={index}
            category={news.category}
            date={news.date}
            imageSource={news.imageSource}
          />
        ))}
      </ScrollView>
      <BottomNavigation navigation={navigation.navigate} />
    </>
  );
};

export default AllNewsList;
