import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import PlusIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MainButtonWithIcon from '../../components/common/buttons/MainButtonWithIcon';

import CreateOrderItemsModal from '../../components/SiteManager/CreateOrderItemsModal';

const PlaceOrders = () => {
  const [items, setItems] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const handleVisibility = () => {
    console.log(modalIsVisible);
    setModalIsVisible(true);
  };

  const item = ({ item }) => {
    return (
      <View className="flex flex-row bg-primary-color p-4">
        <Icon name="close" className="absolute top-0 right-0" />
        <Image
          source={item.url ?? require('../../assets/images/noImg.jpg')}
          className="w-[80px] h-[80px]"
        />
        <View className="flex flex-col">
          <Text>{item.name}</Text>
          <Text>Qty</Text> <Input />
          {item.extra &&
            item.extra.map((extra) => (
              <>
                <Text>{extra.name}</Text>
                <input />
              </>
            ))}
        </View>
      </View>
    );
  };
  return (
    <View>
      <CreateOrderItemsModal
        visibility={modalIsVisible}
        setVisibility={setModalIsVisible}
      />
      <View style={styles.addButton}>
        <MainButtonWithIcon
          icon={<PlusIcon name="plus-circle-outline" size={40} />}
          text="Add items"
          iconBeforeText={true}
          onPress={handleVisibility}
        />
      </View>
      {items.map((item) => item(item))}
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
