import { ScrollView, View, Text, Alert } from 'react-native';
import React from 'react';
import data from '../../assets/data/Suppliers';

const ViewSuppliers = () => {
  return (
    <ScrollView style={{ padding: 20 }}>
      {data &&
        data.map((i, index) => (
          <View
            key={index}
            style={{
              padding: 20,
              backgroundColor: '#facc15',
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
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>ID: {i.id}</Text>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
              Name: {i.name}
            </Text>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
              Item: {i.items}
            </Text>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
              Price: {i.price}
            </Text>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
              Rating: {i.rating}
            </Text>
          </View>
        ))}
    </ScrollView>
  );
};

export default ViewSuppliers;
