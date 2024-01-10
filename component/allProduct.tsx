import {ScrollView, Dimensions, Text, View} from 'react-native';
import ListItem from './commons/ListItem';
import {productsData} from './helper';

const AllProductList: React.FC = ({navigation}: any) => {
  return (
    <ScrollView>
      <View>
        <Text
          style={{
            color: 'black',
            fontSize: 28,
            fontWeight: '700',
            marginLeft: 10,
          }}>
          Products
        </Text>
        <Text style={{color: '#8D95A0', fontSize: 14, marginLeft: 10}}>
          Overview
        </Text>
      </View>
      {productsData.map((product, index) => (
        <ListItem
          key={index}
          dailyIncome="112.8"
          imageSource={product.imageSource}
          isHot
          price={product.price}
          purchaseLimit="2 / person"
          title={product.title}
          validityPeriod="48 / Days"
          navigate={navigation.navigate}
        />
      ))}
    </ScrollView>
  );
};

export default AllProductList;
