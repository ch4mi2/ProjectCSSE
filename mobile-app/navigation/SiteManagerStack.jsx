import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileIcon from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Home from '../screens/SiteManager/Home';

const Tab = createBottomTabNavigator();

const SupplierStack = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: '#0284C7',
            height: 70,
            paddingBottom: 10,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            borderTopWidth: 3,
            borderLeftWidth: 3,
            borderRightWidth: 3,
            borderBottomWidth: 0,
            borderColor: '#000',
          },
          tabBarLabelStyle: {
            fontWeight: 'bold',
            color: '#000',
            fontSize: 14,
          },
          tabBarHideOnKeyboard: true,
        })}
        sceneContainerStyle={{ backgroundColor: '#F0F9FF' }}
      >
        <Tab.Screen
          name={'home'}
          component={Home}
          options={{
            tabBarIcon: () => <Icon name="home" size={30} />,
          }}
        />
        <Tab.Screen
          name={'orders'}
          component={Home}
          options={{
            tabBarIcon: () => <ProfileIcon name="user" size={48} />,
          }}
        />
        <Tab.Screen
          name={'notifications'}
          component={Home}
          options={{
            tabBarIcon: () => <ProfileIcon name="user" size={48} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default SupplierStack;
