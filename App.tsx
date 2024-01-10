import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './component/HomeScreen';
import TeamPage from './component/team';
import Profile from './component/profilePage';
import ViewProduct from './component/viewProduct';
import Refferer from './component/refer';
import Support from './component/support';
import LuckySpinner from './component/luckySpinner';
import SignupScreen from './component/signup';
import LoginScreen from './component/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Header from './component/header';

const Stack = createNativeStackNavigator();

const App = () => {
  const [whereToGO, setThis] = useState('');
  useEffect(() => {
    if (Platform.OS === 'android') {
      // SplashScreen.hide();
    }
    StatusBar.setBackgroundColor("#7a9f86")

  }, []);

  return (
    <>
      <NavigationContainer
        theme={{
          dark: false,
          colors: {
            primary: '',
            background: '#fefefe',
            card: '',
            text: '#000',
            border: '',
            notification: '',
          },
        }}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
              // header: () => <Header title="Home" walletNumber={100} />,
            }}
          />
          <Stack.Screen
            name="Team"
            component={TeamPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Personal"
            component={Profile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="profile"
            component={Profile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ViewProduct"
            component={ViewProduct}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Refferer"
            component={Refferer}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Support"
            component={Support}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LuckySpinner"
            component={LuckySpinner}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
