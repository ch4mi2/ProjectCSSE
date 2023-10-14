import { View, Text, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import {
  GetAllItemsURI,
  GetAllSitesURI,
  GetAllSuppliersURI,
} from '../../constants/URI';
import CloseIcon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import MainButton from '../common/buttons/MainButton';

const CreateOrderItemsModal = ({ visibility, setVisibility }) => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState();
  const [sites, setSites] = useState([]);
  const [address, setAddress] = useState();
  const [supplier, setSupplier] = useState();
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);

  useState(() => {
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

    fetchSites();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(GetAllItemsURI);
        const json = await response.json();
        if (response.ok) {
          let arr = json.filter(
            (item) =>
              item.chosenOnesPrice !== null &&
              item.chosenOnesPrice !== undefined
          );

          setItems(arr);
          setName(arr[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, []);

  const handleSelectItem = (val) => {
    setName(val);

    const fetchSupplierName = async (val) => {
      try {
        const res = await fetch(`${GetAllSuppliersURI}/${val.chosenOne}`);
        if (res.ok) {
          const json = await res.json();
          setSupplier(json.name);
        }
      } catch (err) {
        console.log(err);
        setSupplier(val.chosenOne);
      }
    };
    fetchSupplierName(val);
  };

  useEffect(() => {
    if (name !== undefined && !isNaN(qty)) {
      var tot = parseFloat(name.chosenOnesPrice) * parseFloat(qty);
      setTotal(tot);
    } else {
      setTotal(0);
    }
  }, [name, qty]);

  const handleAddItem = () => {};

  return (
    <View>
      <Modal
        isVisible={visibility}
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
        <CloseIcon
          size={48}
          name="close"
          onPress={() => setVisibility(false)}
          style={{ position: 'absolute', top: 0, right: 0, color: '#facc15' }}
        />
        <ScrollView className=" flex-1">
          {items && sites && (
            <>
              <Text className="text-lg mt-6  mb-2 font-bold">Item Name</Text>
              <View className="border border-1 rounded-xl">
                <Picker
                  className=""
                  placeholder="Select Item"
                  selectedValue={name}
                  dropdownIconColor={'black'}
                  dropdownIconRippleColor={'#0284C7'}
                  selectionColor={'#0284C7'}
                  onValueChange={(itemValue) => handleSelectItem(itemValue)}
                  style={{ borderWidth: 4, borderColor: '#000' }}
                >
                  {items &&
                    items.map((item, index) => (
                      <Picker.Item key={index} label={item.name} value={item} />
                    ))}
                </Picker>
              </View>

              <Text className={'text-lg  mb-2 mt-6 font-bold'}>Supplier</Text>
              <TextInput
                value={supplier && supplier}
                readOnly={true}
                className={'border border-1 rounded-xl p-[12px] '}
              />

              <Text className={'text-lg mt-6 mb-2  font-bold'}>
                Select Site Address
              </Text>
              <View className="border border-1 rounded-xl">
                <Picker
                  className="border border-4 px-4 py-2"
                  placeholder="Select Site Address"
                  selectedValue={address}
                  dropdownIconColor={'black'}
                  dropdownIconRippleColor={'#0284C7'}
                  selectionColor={'#0284C7'}
                  onValueChange={(itemValue) => setAddress(itemValue)}
                >
                  {sites &&
                    sites.map((site) => (
                      <Picker.Item
                        key={site}
                        label={site.address}
                        value={site}
                      />
                    ))}
                </Picker>
              </View>

              <Text className={'text-lg mt-6  mb-2 font-bold'}>Quantity</Text>
              <TextInput
                placeholder="Enter Quantity"
                value={qty.toString()}
                onChangeText={(val) => setQty(parseInt(val) || 0)}
                className={'border border-1 rounded-xl p-[12px] '}
                keyboardType="numeric"
                inputMode="numeric"
              />
            </>
          )}
        </ScrollView>
        <View className="flex m-0 p-0 w-full h-[150px] justify-center">
          <View className="absolute bottom-0 bg-primary-color w-[1000%] top-0 right-0 mr-[-300px] mt-[50px] h-[1000%]"></View>
          <View className="flex flex-row mt-20">
            <Text className="mt-4 text-xl font-bold">Total : </Text>
            <Text className="mt-4 text-xl font-bold ml-auto">
              Rs. {total.toFixed(2)}
            </Text>
          </View>
          <MainButton
            text="Add Item"
            containerStyles="mt-8 ml-[-10px] bg-custom-black"
            textStyles={'text-white'}
            onPress={handleAddItem}
          />
        </View>
      </Modal>
    </View>
  );
};

export default CreateOrderItemsModal;
