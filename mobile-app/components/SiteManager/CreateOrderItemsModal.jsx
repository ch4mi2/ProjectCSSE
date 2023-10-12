import { View, Text, Input } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import { GetAllItemsURI, GetAllSitesURI } from '../../constants/URI';

const CreateOrderItemsModal = ({ visibility }) => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState();
  const [sites, setSites] = useState([]);
  const [address, setAddress] = useState();
  const [supplier, setSupplier] = useState(null);
  const [qty, setQty] = useState(0);

  useState(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(GetAllItemsURI);
        const json = await response.json();
        if (response.ok) {
          setItems(json);
          setName(json[0]);
          console.log(json);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSites = async () => {
      try {
        const response = await fetch(GetAllSitesURI);
        const json = await response.json();
        if (response.ok) {
          setSites(json);
          setAddress(json[0]);
          console.log(json);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
    fetchSites();
  }, []);

  const handleSelectItem = (val) => {
    setName(val);
    setSupplier(val.supplier);
  };

  return (
    <View>
      <Modal isVisible={visibility}>
        <View className="flex-1">{items && sites && <></>}</View>
      </Modal>
    </View>
  );
};

export default CreateOrderItemsModal;
