import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import { useEffect, useState } from 'react';

const SwiperComponent = () => {
  useEffect(() => {
    const fetchSites = async () => {
      const response = await fetch('/getAllSites');

      if (response.ok) {
        setSites(response.json());
      }
    };
    fetchSites();
  }, []);

  const [sites, setSites] = useState(null);
  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      activeDotColor={'black'}
    >
      <View style={styles.slide1}>
        <Text style={styles.text}>Hello Swiper</Text>
      </View>
      <View style={styles.slide2}>
        <Text style={styles.text}>Beautiful</Text>
      </View>
      <View style={styles.slide3}>
        <Text style={styles.text}>And simple</Text>
      </View>
    </Swiper>
  );
};

export default SwiperComponent;

const styles = StyleSheet.create({
  paginationStyle: {
    color: 'red',
  },
  wrapper: {},
  slide1: {
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    backgroundColor: '#97CAE5',
  },
  slide3: {
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
