import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GetAllOrdersURI } from '../../constants/URI';
import { auth } from '../../firebase';

const Orders = () => {
  const [orders, setOrders] = useState([]);

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
          setOrders(filteredOrders);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, []);

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
        {orders &&
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
            </View>
          ))}
      </View>
    </ScrollView>
  );
};

export default Orders;
