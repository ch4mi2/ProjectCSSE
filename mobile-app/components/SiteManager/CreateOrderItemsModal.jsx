import { View, Text, Input } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';

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
        const response = await fetch(GetAllItems);
        const json = await response.json();
        if (response.ok) {
          setItems(json);
          setName(json[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSites = async () => {
      try {
        const response = await fetch(GetAllSites);
        const json = await response.json();
        if (response.ok) {
          setSites(json);
          setAddress(json[0]);
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
        <View className="flex-1">
          <Text>Item Name</Text>
          <Picker
            className="border border-4 px-4 py-2"
            placeholder="Select Item"
            selectedValue={name}
            dropdownIconColor={'black'}
            dropdownIconRippleColor={'#0284C7'}
            selectionColor={'#0284C7'}
            onValueChange={(itemValue) => handleSelectItem(itemValue)}
          >
            {items.map((item, index) => (
              <Picker.Item key={index} label={item.name} value={item} />
            ))}
          </Picker>

          <Text>Supplier</Text>
          <Input value={supplier.name} disabled={true} />

          <Text>Select Site Address</Text>
          <Picker
            className="border border-4 px-4 py-2"
            placeholder="Select Site Address"
            selectedValue={address}
            dropdownIconColor={'black'}
            dropdownIconRippleColor={'#0284C7'}
            selectionColor={'#0284C7'}
            onValueChange={(itemValue) => setAddress(itemValue)}
          >
            {sites.map((site) => (
              <Picker.Item key={site} label={site.address} value={site} />
            ))}
          </Picker>

          <Text>Quantity</Text>
          <Input
            placeholder="Enter Quantity"
            value={qty}
            onValueChange={(val) => setQty(val)}
          />

          <Text>Requested Date</Text>
        </View>
      </Modal>
    </View>
  );
};

export default CreateOrderItemsModal;
