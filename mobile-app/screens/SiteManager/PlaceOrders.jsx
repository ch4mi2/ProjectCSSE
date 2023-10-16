import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import PlusIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MainButtonWithIcon from '../../components/common/buttons/MainButtonWithIcon';
import CreateOrderItemsModal from '../../components/SiteManager/CreateOrderItemsModal';
import MainButton from '../../components/common/buttons/MainButton';
import Modal from 'react-native-modal';
import { CreateCommentURI, CreateOrderURI } from '../../constants/URI';
import { auth } from '../../firebase';
import { useNavigation } from '@react-navigation/native';

const PlaceOrders = () => {
  const [order, setOrder] = useState();
  const [needApproval, setNeedApproval] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);
  const [items, setItems] = useState([]);
  const [restricted, setRestricted] = useState(false);
  const [placeOrderIsVisible, setPlaceOrderIsVisible] = useState(false);
  const [Comments, setComments] = useState('');
  const [isSelected, setSelection] = useState(false);
  const navigation = useNavigation();

  const handleVisibility = () => {
    setModalIsVisible(true);
  };

  useEffect(() => {
    let total = 0;
    items.forEach((item) => {
      total += parseFloat(item.total);
    });
    setGrandTotal(total);
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

  const handleDeleteItem = (item) => {
    setItems(items.filter((i) => i.id !== item.id));
  };

  const handlePlaceOrderClick = () => {
    let approvalNeeded;
    for (i in items) {
      if (i.restricted) {
        setRestricted(true);
        approvalNeeded = true;
        break;
      } else {
        approvalNeeded = false;
      }

      if (grandTotal > 100000) {
        approvalNeeded = true;
      }
    }

    setNeedApproval(approvalNeeded);
    setPlaceOrderIsVisible(true);
  };

  const handleSendOrder = async () => {
    try {
      const orderedItems = {};
      const orderedSites = {};

      for (let index = 0; index < items.length; index++) {
        orderedItems[items[index].id] = items[index].qty;
        orderedSites[items[index].id] = items[index].site.id;
      }

      const orderPayload = {
        total: grandTotal,
        site: orderedSites,
        items: orderedItems,
        siteManager: auth.currentUser.uid,
        draft: isSelected,
        comments: Comments,
      };

      if (needApproval) {
        orderPayload.state = 'pending';
      }

      const res = await fetch(CreateOrderURI, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      if (res.ok) {
        console.log(orderPayload);
        Alert.alert('Order Placed Successfully');
        if (Comments.length > 0) {
          try {
            const resp = await fetch(CreateCommentURI, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderId: res.id,
                texts: [Comments],
              }),
            });
          } catch (error) {
            Alert.alert(error);
          }
        }
      } else {
        Alert.alert('Failed to place order');
      }

      navigation.navigate('home-stack');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('An error occurred while placing the order');
    }
  };

  const PlaceOrderModal = ({ isVisible }) => {
    return (
      <Modal
        isVisible={isVisible}
        onBackdropPress={this.close}
        backdropColor="#fff"
        backdropOpacity={1}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        propagateSwipe
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
        style={{
          backgroundColor: 'white',
          padding: 30,
        }}
        coverScreen={true}
      >
        <View style={{ flex: 1, display: 'flex' }}>
          <Icon
            name="arrow-left"
            size={30}
            onPress={() => setPlaceOrderIsVisible(false)}
            style={{ position: 'absolute', top: 0, left: 0, color: '#facc15' }}
          />
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 40,
              marginTop: 30,
            }}
          >
            Place order
          </Text>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
            <Checkbox
              value={isSelected}
              onValueChange={setSelection}
              style={{}}
            />
            <Text style={{ fontWeight: 'bold' }}>Draft Order</Text>
          </View>

          <Text style={{ marginTop: 20, marginBottom: 10, fontWeight: 'bold' }}>
            Comments
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              paddingHorizontal: 20,
              paddingVertical: 10,
              textAlignVertical: 'top',
            }}
            multiline={true}
            placeholder="Add Comments"
            numberOfLines={10}
            textAlign="left"
            onChangeText={(val) => setComments(val)}
            value={Comments}
          />
          {needApproval ? (
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: 30,
                color: 'red',
              }}
            >
              Approval Needed
            </Text>
          ) : (
            <Text
              style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 30 }}
            >
              Does Not Need Approval
            </Text>
          )}

          <Text
            style={{
              fontSize: 19,
              fontWeight: 'bold',
              textAlign: 'center',
              marginVertical: 30,
            }}
          >
            Grand Total : Rs. {grandTotal.toFixed(2)}
          </Text>
          {grandTotal > 0 && (
            <View style={{ marginTop: 20, flex: 1 }}>
              <MainButton
                text="Place Order"
                containerStyles="w-full"
                onPress={handleSendOrder}
              />
            </View>
          )}
        </View>
      </Modal>
    );
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
          onPress={() => handleDeleteItem(item)}
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
    <View style={{ flex: 1 }}>
      <ScrollView style={{ paddingBottom: 150, marginBottom: 150 }}>
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
      <View
        style={{
          backgroundColor: '#facc15',
          height: 150,
          width: '100%',
          zIndex: 100,
          position: 'absolute',
          bottom: 0,
        }}
      >
        <PlaceOrderModal isVisible={placeOrderIsVisible} />
        <View style={{ flexDirection: 'row', margin: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Grand Total :
          </Text>
          <Text
            style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 'auto' }}
          >
            Rs. {grandTotal.toFixed(2)}
          </Text>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <MainButton
            containerStyles="w-full bg-custom-black"
            textStyles={'text-white'}
            text="Place Order"
            onPress={handlePlaceOrderClick}
          />
        </View>
      </View>
    </View>
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
