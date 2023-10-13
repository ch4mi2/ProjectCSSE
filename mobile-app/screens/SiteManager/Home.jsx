import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import SwiperComponent from '../../components/SiteManager/Swiper';

import MainButtonWithIcon from '../../components/common/buttons/MainButtonWithIcon';
import MainButton from '../../components/common/buttons/MainButton';
import Icon from 'react-native-vector-icons/Octicons';

const Home = ({ navigation }) => {
  const handlePressPlaceOrders = () => {
    navigation.navigate('place-orders-stack');
  };

  const handlePressViewSuppliers = () => {
    console.log('View Suppliers');
  };

  const handlePressViewPlacedOrders = () => {
    console.log('View Placed Orders');
  };

  const handlePressViewCreditNotes = () => {
    console.log('View Credit Notes');
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
      <View className={'flex flex-col'}>
        <MainButtonWithIcon
          onPress={handlePressViewSuppliers}
          text={'View Suppliers'}
          icon={
            <Icon name="chevron-right" size={40} style={styles.alignRight} />
          }
        />
        <MainButtonWithIcon
          onPress={handlePressViewPlacedOrders}
          text={'Placed Orders'}
          icon={
            <Icon name="chevron-right" size={40} style={styles.alignRight} />
          }
        />
        <MainButtonWithIcon
          onPress={handlePressViewCreditNotes}
          text={'Credit Notes'}
          icon={
            <Icon name="chevron-right" size={40} style={styles.alignRight} />
          }
        />
      </View>
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
    marginBottom: 8,
  },
  alignRight: {
    marginLeft: 'auto',
  },
});

export default Home;
