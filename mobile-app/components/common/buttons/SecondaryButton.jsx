import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

const SecondaryButton = ({ onPress, text, containerStyles, textStyles }) => {
  return (
    <TouchableOpacity
      className={`w-[80vw] bg-lightest-blue border-[3px] border-dark-blue rounded-xl py-2 pb-3 px-4 ${containerStyles}`}
      onPress={onPress}
    >
      <Text
        className={`text-xl text-center font-bold text-dark-blue ${textStyles}`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;
