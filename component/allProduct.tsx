import { ScrollView, Dimensions, Text, View, Alert, Switch } from 'react-native';
import ListItem from './commons/ListItem';
// import { productsData } from './helper';
import BottomNavigation from './buttomBar';
import CommonHeader from './commonHeader'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { backend_url, handle500Error } from './helper';
import { ProductType } from '../interfaces';
import Loader from './commons/Loader';
import { Card } from 'react-native-elements';

const AllProductList: React.FC = ({ navigation }: any) => {
  const [productsData, setProductsData] = useState<null | ProductType[]>(null)
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  useEffect(() => {
    axios.get(backend_url + "/api/v1/user/getAllProduct").then(({ data }) => {
      console.log("kk1", data);
      setProductsData(data)
    }).catch((error) => {
      handle500Error(error.message)
    })
  }, [])
  return (
    <>
      <ScrollView>
        <CommonHeader title='Products' previousPage='' />
        <Card containerStyle={{ padding: 20, margin: 10, borderRadius: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
            <Text style={{ color: "#000" }}>{isEnabled ? 'Show All' : 'Show only hot Products'}</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#767577' }}
              thumbColor={isEnabled ? '#7a9f86' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </Card>
        {productsData && productsData.map((product, index) => {
          if (isEnabled) {
            if (product.isHot) {
              return <ListItem
                key={index}
                dailyIncome={product.dailyIncome}
                imageSource={product.imageSource}
                isHot={product.isHot}
                price={product.price}
                purchaseLimit={product.purchaseLimit}
                title={product.title}
                validityPeriod={product.validity}
                navigate={navigation.navigate}
                desc={product.desc}
              />
            }
          } else {
            return <ListItem
              key={index}
              dailyIncome={product.dailyIncome}
              imageSource={product.imageSource}
              isHot={product.isHot}
              price={product.price}
              purchaseLimit={product.purchaseLimit}
              title={product.title}
              validityPeriod={product.validity}
              navigate={navigation.navigate}
              desc={product.desc}
            />
          }
        })}
        <View style={{ height: 80 }}></View>
      </ScrollView>
      <BottomNavigation navigation={navigation.navigate} />
      <Loader visible={!productsData} />
    </>
  );
};

export default AllProductList;
