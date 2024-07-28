import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // **Add this import**
import Dangnhap from './screens/Dangnhap';
import Chao from './screens/Chao';
import TabNavigatior from './screens/TabNavigatior';
import { Provider } from 'react-redux';
import store from './Bieton2/store';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function App()  {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Chao">
        <Stack.Screen name="Chao" component={Chao} options={{ headerShown: false }} />
            <Stack.Screen name="Dangnhap" component={Dangnhap} options={{headerShown:false}}/>
            <Stack.Screen name="Home" component={TabNavigatior} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
  );
};
