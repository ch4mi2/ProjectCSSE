import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

const MainButton = ({ onPress, text, containerStyles, textStyles }) => {
  return (
    <TouchableOpacity
      className={` w-[80vw] rounded-xl py-2 pb-3 px-4 bg-primary-color ${containerStyles}`}
      onPress={onPress}
    >
      <Text
        className={`text-xl text-center font-bold text-custom-black  ${textStyles}`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default MainButton;
