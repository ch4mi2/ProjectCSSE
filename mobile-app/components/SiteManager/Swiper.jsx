import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import { useEffect, useState } from 'react';
import { GetAllSites } from '../../constants/URI';

const SwiperComponent = () => {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await fetch(GetAllSites);
        const json = await response.json();
        if (response.ok) {
          setSites(json);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSites();
  }, []);

  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      activeDotColor={'black'}
    >
      {sites &&
        sites.map((site) => (
          <View style={styles.slide1} key={site}>
            <Text style={styles.text}>{site.name}</Text>
          </View>
        ))}
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
