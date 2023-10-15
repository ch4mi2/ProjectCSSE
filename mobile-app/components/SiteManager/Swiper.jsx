import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';

const SwiperComponent = ({ sites }) => {
  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      showsPagination={false}
      height={100}
      loop={true}
      autoplay={true}
      autoplayTimeout={3}
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
