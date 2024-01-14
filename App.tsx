import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './component/HomeScreen';
import TeamPage from './component/team';
import Profile from './component/profilePage';
import ViewProduct from './component/viewProduct';
import Refferer from './component/refer';
import Support from './component/support';
import LuckySpinner from './component/luckySpinner';
import SignupScreen from './component/signup';
import LoginScreen from './component/login';
import { Platform, StatusBar } from 'react-native';
import AllProductList from './component/allProduct';
import AllNewsList from './component/allNewsList';
import CliamReward from './component/claimReward';
import AddFundScreen from './component/addPoints';
import { updateUserInfo } from './component/helper';
import BuyProductPage from './component/buyProduct';
import AboutUs from './component/aboutUs';
import AllActiveTrasctions from './component/AllActiveTrasctions';

const Stack = createNativeStackNavigator();

const App = () => {
  const [whereToGO, setThis] = useState('');
  useEffect(() => {
    updateUserInfo()
    if (Platform.OS === 'android') {
      // SplashScreen.hide();
    }
    StatusBar.setBackgroundColor("#7a9f86")
  }, []);

  return (
    <>
        <NavigationContainer
          theme={{
            dark: true,
            colors: {
              primary: '',
              background: '#fefefe',
              card: '',
              text: '#000',
              border: '',
              notification: '',
            },
          }}>
          <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Team"
              component={TeamPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Personal"
              component={Profile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="profile"
              component={Profile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ViewProduct"
              component={ViewProduct}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Refferer"
              component={Refferer}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Support"
              component={Support}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LuckySpinner"
              component={LuckySpinner}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AllProductList"
              component={AllProductList}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AllNewsList"
              component={AllNewsList}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CliamReward"
              component={CliamReward}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddFundScreen"
              component={AddFundScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BuyProductPage"
              component={BuyProductPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AboutUs"
              component={AboutUs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AllActiveTrasctions"
              component={AllActiveTrasctions}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
    </>
  );
};

export default App;
