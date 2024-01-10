import {ScrollView, Text, View} from 'react-native';
import {newsData} from './helper';
import NewsItem from './commons/newsItem';

const AllNewsList: React.FC = () => {
  return (
    <ScrollView>
      <View>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 28,
              fontWeight: '700',
              marginLeft: 16,
            }}>
            Today
          </Text>
          <Text style={{color: '#8D95A0', fontSize: 14, marginLeft: 20}}>
            NEWS
          </Text>
        </View>
      </View>
      {newsData.map((news, index) => (
        <NewsItem
          key={index}
          category={news.category}
          date={news.date}
          imageSource={news.imageSource}
        />
      ))}
    </ScrollView>
  );
};

export default AllNewsList;
