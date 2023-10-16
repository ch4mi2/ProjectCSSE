import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from '../screens/ProfileScreen';
import OrderIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from '../screens/SiteManager/Home';
import Orders from '../screens/SiteManager/Orders';
import SiteManagerHeader from '../components/header/SIteManagerHeader';
import NotificationIcon from 'react-native-vector-icons/Ionicons';
import SiteManagerHomeStack from './SiteManagerHomeStack';
import Notifications from '../screens/SiteManager/Notifications';

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
          header: () => <SiteManagerHeader user={user} route={route} />,
          tabBarHideOnKeyboard: true,
        })}
        sceneContainerStyle={{ backgroundColor: 'white' }}
      >
        <Tab.Screen
          name={'home'}
          component={SiteManagerHomeStack}
          options={{
            tabBarIcon: () => <Icon name="home" size={38} />,
          }}
        />
        <Tab.Screen
          name={'orders'}
          component={Orders}
          options={{
            tabBarIcon: () => (
              <OrderIcon name="clipboard-text-clock" size={35} />
            ),
          }}
        />
        <Tab.Screen
          name={'notifications'}
          component={Notifications}
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
