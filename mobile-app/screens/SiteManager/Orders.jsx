import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { CreateOrderURI, GetAllOrdersURI } from '../../constants/URI';
import { auth } from '../../firebase';

const Orders = ({ navigation: { goBack }, route }) => {
  const [orders, setOrders] = useState([]);
  const [componentKey, setComponentKey] = useState(
    route.params?.key || 'initial-key'
  );

  const [isLoading, setIsLoading] = useState(true); // State to track loading

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(GetAllOrdersURI);
        const json = await response.json();
        if (response.ok) {
          const currentUser = auth.currentUser.uid;
          let filteredOrders = json.filter(
            (item) => item.siteManager === currentUser
          );

          filteredOrders.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          setOrders(filteredOrders);
          setComponentKey(route.params?.key || 'initial-key');
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false); // Set loading to false once fetching is done
      }
    };

    fetchOrders();
  }, [componentKey, route.params?.key]);

  const handlePublish = async (order) => {
    try {
      const response = await fetch(`${CreateOrderURI}${order.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...order,
          draft: false,
        }),
      });

      if (response.status === 200) {
        //console.log(navigation);
        Alert.alert('Successfully Updated');
        goBack();
      } else {
        Alert.alert('An error occurred while updating the order');
      }
    } catch (error) {
      Alert.alert('An error occurred', error.toString());
    }
  };

  return (
    <ScrollView>
      <View style={{ margin: 30 }}>
        <Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            marginBottom: 20,
            fontWeight: 'bold',
          }}
        >
          Current Orders
        </Text>

        {isLoading ? ( // Display loading component if isLoading is true
          <ActivityIndicator size="large" color="#facc15" />
        ) : (
          orders &&
          orders.map((order) => (
            <View
              key={order.id}
              style={{
                backgroundColor: '#facc15',
                padding: 20,
                marginVertical: 10,
                borderRadius: 15,
                elevation: 10, // Add this line to create a drop shadow
                shadowColor: '#000', // Shadow color
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.5,
                shadowRadius: 3.84,
                borderWidth: 5,
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>
                Draft : {order.draft.toString()}
              </Text>

              <Text style={{ fontWeight: 'bold' }}>
                Order Status : {order.state}
              </Text>
              <Text style={{ fontWeight: 'bold' }}>
                Total Amount : Rs {order.total.toFixed(2)}
              </Text>
              <Text style={{ fontWeight: 'bold' }}>
                Comments : {order.comments}
              </Text>
              {order.draft ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: 'black',

                    marginLeft: 'auto',
                    borderRadius: 10,
                    padding: 10,
                  }}
                  onPress={() => handlePublish(order)}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    Publish
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default Orders;
