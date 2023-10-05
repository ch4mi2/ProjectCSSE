import { View, Text, Button } from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import MainButton from '../buttons/MainButton';

// see LoginScreen for example usage
const DismissibleAlert = ({ data, setData }) => {
  const toggleModal = () => {
    setData((prev) => ({ ...data, visibility: false }));
  };

  return (
    <Modal isVisible={data.visibility}>
      <View className={`bg-white p-4 m-4 rounded-xl ${data.viewStyles}`}>
        <Text
          className={`text-2xl mb-2 text-center font-bold ${data.titleStyles}`}
        >
          {data.title ?? ''}
        </Text>
        <Text className={`text-center text-lg mb-4 ${data.messageStyles}`}>
          {data.message}
        </Text>
        <MainButton
          text={data.buttonText ?? 'Cancel'}
          onPress={toggleModal}
          containerStyles={'w-full'}
        />
      </View>
    </Modal>
  );
};

export default DismissibleAlert;
