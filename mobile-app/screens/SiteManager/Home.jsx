import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import SwiperComponent from '../../components/SiteManager/Swiper';

import MainButton from '../../components/common/buttons/MainButton';

const Home = () => {
  const handlePressPlaceOrders = () => {
    console.log('Place Orders');
  };
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <MainButton
          containerStyles={'mt-4 justify-center'}
          onPress={handlePressPlaceOrders}
          text={'Place Order'}
        />
      </View>
      <Text style={styles.sitesText}>Sites</Text>
      <SwiperComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sitesText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default Home;
