import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileIcon from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Home from '../screens/SiteManager/Home';
import { View } from 'react-native';
import SiteManagerHeader from '../components/header/SIteManagerHeader';

const Tab = createBottomTabNavigator();

const SiteManagerView = ({ user }) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: '#facc15',
            height: 70,
          },
          tabBarLabelStyle: {
            fontWeight: 'bold',
            color: '#000',
            fontSize: 14,
          },
          header: () => <SiteManagerHeader user={user} />,
          tabBarHideOnKeyboard: true,
        })}
        sceneContainerStyle={{ backgroundColor: 'white' }}
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
        <Tab.Screen
          options={{ tabBarVisible: false, tabBarButton: () => null }}
          name={'profile'}
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default SiteManagerView;
