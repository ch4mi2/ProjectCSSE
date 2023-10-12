import { StyleSheet, Text, View, Image } from 'react-native';
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
      showsPagination={false}
      height={100}
    >
      {sites &&
        sites.map((site) => (
          <View
            className={'bg-primary-color p-4 flex  flex-row gap-6 shadow '}
            style={styles.slide}
            key={site}
          >
            <Image
              source={site.img ?? require('../../assets/images/noImg.jpg')}
              className={'w-[80px] h-[80px] rounded-3xl'}
              style={styles.shadow}
            />
            <View className={'flex flex-col'}>
              <Text className="text-grey-400">{site.name}</Text>
              <Text className="text-grey-400 mt-4">{site.address}</Text>
            </View>
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
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
