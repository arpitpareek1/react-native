import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './component/HomeScreen';
import TeamPage from './component/team';
import Profile from './component/profilePage';
import ViewProduct from './component/viewProduct';
import Refferer from './component/refer';
import Support from './component/support';
import BottomNavigation from './component/buttomBar';

const Stack = createNativeStackNavigator();

const App = ({navigation}) => (
  <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="team"
          component={TeamPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="paresnal"
          component={HomeScreen}
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
      </Stack.Navigator>
    </NavigationContainer>
    {/* <BottomNavigation navigation={navigation.navigation}/> */}
  </>
);

export default App;
