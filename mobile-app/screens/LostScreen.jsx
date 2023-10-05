import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { AddLostItem } from '../constants/RouteConstants';

const LostScreen = () => {
  const navigation = useNavigation();

  const handleAddItem = () => {
    navigation.navigate(AddLostItem);
  };

  return (
    <View>
      <Text>LostScreen</Text>
      <TouchableOpacity onPress={handleAddItem}>
        <Text>Add Item</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LostScreen;
