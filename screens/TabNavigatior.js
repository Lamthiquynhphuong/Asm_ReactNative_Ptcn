import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Trangchu from './Trangchu';
import Activity from './Activity';
import Bieton from './Bieton';
import Buochay from './Buochay';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Nctinhthan from './Nctinhthan';

const Tab = createBottomTabNavigator();

const TabNavigatior = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Trangchu':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Activity':
              iconName = focused ? 'list' : 'list-outline';
              break;
            case 'Bieton':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'Buocchay':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'Chaybo':
              iconName = focused ? 'walk' : 'walk-outline';
              break;
            default:
              iconName = 'circle';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          height: 60,
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen 
        name="Trangchu" 
        component={Trangchu} 
        options={{ 
          title: 'Trang chủ',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Chạy bộ" 
        component={Nctinhthan} 
        options={{ 
          title: 'Chạy bộ',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name={focused ? 'walk' : 'walk-outline'} size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Luyện tập" 
        component={Activity} 
        options={{ 
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name={focused ? 'list' : 'list-outline'} size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Bieton" 
        component={Bieton} 
        options={{ 
          title: 'Biết ơn',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name={focused ? 'heart' : 'heart-outline'} size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Cá nhân" 
        component={Buochay} 
        options={{ 
          title: 'Cá nhân',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name={focused ? 'person' : 'person-outline'} size={size} color={color} />
          ),
        }} 
      />
      
    </Tab.Navigator>
  );
};

export default TabNavigatior;

const styles = StyleSheet.create({});
