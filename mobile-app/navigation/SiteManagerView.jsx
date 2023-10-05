import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from '../screens/ProfileScreen';
import OrderIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from '../screens/SiteManager/Home';
import { View } from 'react-native';
import SiteManagerHeader from '../components/header/SIteManagerHeader';
import NotificationIcon from 'react-native-vector-icons/Ionicons';
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
            paddingBottom: 10,
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
            tabBarIcon: () => <Icon name="home" size={38} />,
          }}
        />
        <Tab.Screen
          name={'orders'}
          component={Home}
          options={{
            tabBarIcon: () => (
              <OrderIcon name="clipboard-text-clock" size={35} />
            ),
          }}
        />
        <Tab.Screen
          name={'notifications'}
          component={Home}
          options={{
            tabBarIcon: () => (
              <NotificationIcon name="notifications" size={35} />
            ),
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
