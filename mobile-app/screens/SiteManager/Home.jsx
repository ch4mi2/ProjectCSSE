import { View, Text } from 'react-native';
import React from 'react';
import MainButton from '../../components/common/buttons/MainButton';

const Home = () => {
  const handlePressPlaceOrders = () => {
    console.log('Place Orders');
  };
  return (
    <View className="px-4">
      <MainButton
        containerStyles={'mt-4 justify-center'}
        onPress={handlePressPlaceOrders}
        text={'Place Order'}
      />
    </View>
  );
};

export default Home;
