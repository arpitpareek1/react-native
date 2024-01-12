import { ScrollView, Dimensions, Text, View } from 'react-native';
import ListItem from './commons/ListItem';
import { productsData } from './helper';
import BottomNavigation from './buttomBar';
import CommonHeader from './commonHeader'

const AllProductList: React.FC = ({ navigation }: any) => {
  return (
    <>
      <ScrollView>


        <CommonHeader title='Products' previousPage='' />
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
        <View style={{height: 80}}></View>
      </ScrollView>
      <BottomNavigation navigation={navigation.navigate} />
    </>
  );
};

export default AllProductList;
