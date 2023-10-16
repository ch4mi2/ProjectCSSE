import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/SiteManager/Home';
import PlaceOrders from '../screens/SiteManager/PlaceOrders';

const Stack = createStackNavigator();

const SiteManagerHomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name="home-stack" component={Home} />
      <Stack.Screen
        name="place-orders-stack"
        component={PlaceOrders}
        Options={{
          headerShown: false,
        }}
        navigation={navigation}
      />
    </Stack.Navigator>
  );
};

export default SiteManagerHomeStack;
