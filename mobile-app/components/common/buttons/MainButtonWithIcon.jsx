import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

const MainButtonWithIcon = ({
  onPress,
  text,
  containerStyles,
  textStyles,
  icon,
  iconBeforeText,
}) => {
  return (
    <TouchableOpacity
      className={` w-full my-2 rounded-xl py-2 pb-3 px-4 bg-primary-color flex flex-row items-center ${containerStyles}`}
      onPress={onPress}
    >
      {iconBeforeText && icon}
      <Text
        className={`text-xl text-center font-bold text-custom-black  ${textStyles}`}
      >
        {text}
      </Text>
      {!iconBeforeText && icon}
    </TouchableOpacity>
  );
};

export default MainButtonWithIcon;
