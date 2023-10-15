import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import PlusIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MainButtonWithIcon from '../../components/common/buttons/MainButtonWithIcon';

import CreateOrderItemsModal from '../../components/SiteManager/CreateOrderItemsModal';

const PlaceOrders = () => {
  const [order, setOrder] = useState();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);
  const [items, setItems] = useState([]);

  const handleVisibility = () => {
    setModalIsVisible(true);
  };

  useEffect(() => {
    console.log(items);
  }, [items]);

  const handleQtyChange = (item, val) => {
    const quantity = parseInt(val, 10) || 0; // Parse input as an integer with base 10
    // Check if quantity is a valid number
    if (!isNaN(quantity) && quantity >= 0) {
      const price = parseFloat(item.price) * quantity;

      const updatedItem = { ...item, qty: quantity, total: price.toFixed(2) };
      const updatedItems = items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      setItems(updatedItems);
    } else {
      // Handle invalid input (e.g., when quantity is not a valid number)
      Alert('Invalid quantity input');
    }
  };
  const Item = ({ item }) => {
    return (
      <View
        style={{
          display: 'flex',
          margin: 20,
          backgroundColor: '#facc15',
          padding: 20,
          borderRadius: 20,
          flexDirection: 'row',
          gap: 20,
          elevation: 10, // Add this line to create a drop shadow
          shadowColor: '#000', // Shadow color
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 3.84,
        }}
      >
        <Icon
          name="close"
          style={{ position: 'absolute', top: 20, right: 20 }}
          size={30}
        />
        <Image
          source={item.url ?? require('../../assets/images/noImg.jpg')}
          style={{ width: 100, height: 100 }}
        />
        <View className="flex flex-col">
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            {item.itemName}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginTop: 10,
            }}
          >
            {console.log(item.qty)}
            <Text>Qty</Text>
            <TextInput
              style={{
                paddingHorizontal: 10,
                width: 100,
                backgroundColor: 'white',
                borderRadius: 5,
                color: 'black',
              }}
              value={item.qty.toString()}
              onChangeText={(val) => handleQtyChange(item, val)}
              keyboardType="numeric"
              inputMode="numeric"
            />
          </View>

          <Text style={{ marginTop: 15, fontWeight: 'bold', fontSize: 16 }}>
            Price : Rs. {parseFloat(item.total).toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <ScrollView>
      <CreateOrderItemsModal
        visibility={modalIsVisible}
        setVisibility={setModalIsVisible}
        setOrder={setItems}
        setGrandTotal={setGrandTotal}
        orders={items}
      />
      <View style={styles.addButton}>
        <MainButtonWithIcon
          icon={<PlusIcon name="plus-circle-outline" size={40} />}
          text="Add items"
          iconBeforeText={true}
          onPress={handleVisibility}
        />
      </View>
      {items.map((item, index) => (
        <Item key={index} item={item} />
      ))}
    </ScrollView>
  );
};

export default PlaceOrders;
const styles = StyleSheet.create({
  addButton: {
    marginLeft: '50%',
    marginRight: 16,
    shadowColor: 'black',
  },
});
