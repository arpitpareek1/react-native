import { ScrollView, Dimensions, Text, View } from 'react-native';
import ListItem from './commons/ListItem';
// import { productsData } from './helper';
import BottomNavigation from './buttomBar';
import CommonHeader from './commonHeader'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { backend_url } from './helper';
import { ProductType } from '../interfaces';
import Loader from './commons/Loader';

const AllProductList: React.FC = ({ navigation }: any) => {
  const [productsData, setProductsData] = useState<null | ProductType[]>(null)
  useEffect(() => {
    axios.get(backend_url + "/api/v1/user/getAllProduct").then(({ data }) => {
      console.log("kk1", data);
      setProductsData(data)
    }).catch(console.log)
  }, [])
  return (
    <>
      <ScrollView>
        <CommonHeader title='Products' previousPage='' />
        {productsData && productsData.map((product, index) => (
          <ListItem
            key={index}
            dailyIncome={product.dailyIncome}
            imageSource={product.imageSource}
            isHot
            price={product.price}
            purchaseLimit={product.purchaseLimit}
            title={product.title}
            validityPeriod={product.validity}
            navigate={navigation.navigate}
            desc={product.desc}
          />
        ))}
        <View style={{ height: 80 }}></View>
      </ScrollView>
      <BottomNavigation navigation={navigation.navigate} />
      <Loader visible={!productsData} />
    </>
  );
};

export default AllProductList;
