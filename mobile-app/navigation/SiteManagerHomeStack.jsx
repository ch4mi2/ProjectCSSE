import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/SiteManager/Home';
import PlaceOrders from '../screens/SiteManager/PlaceOrders';
import ViewSuppliers from '../screens/SiteManager/ViewSuppliers';
import CreditNotes from '../screens/SiteManager/CreditNotes';

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
      <Stack.Screen
        name="view-suppliers-stack"
        component={ViewSuppliers}
        Options={{
          headerShown: false,
        }}
        navigation={navigation}
      />
      <Stack.Screen
        name="credit-notes-stack"
        component={CreditNotes}
        Options={{
          headerShown: false,
        }}
        navigation={navigation}
      />
    </Stack.Navigator>
  );
};

export default SiteManagerHomeStack;
