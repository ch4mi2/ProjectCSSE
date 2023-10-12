import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';

const SiteManagerHeader = ({ user, route }) => {
  const navigation = useNavigation();
  const [profileImg, setProfileImg] = useState(null);
  const [bool, setBool] = useState(true);

  useEffect(() => {
    route.name.includes('stack') ? false : true;
    console.log(route);
  }, [route]);

  return bool ? (
    <View className="bg-primary-color  font-bold h-[18vh] px-8 py-4">
      <SafeAreaView className="flex flex-row flex-wrap">
        <TouchableOpacity onPress={() => navigation.navigate('profile')}>
          <Image
            source={user.img ?? require('../../assets/images/DefaultUser.png')}
            className="w-14 h-14 rounded-full"
            borderColor="black"
            borderWidth={4}
          />
        </TouchableOpacity>
        <View className="flex-col left mx-4">
          <Text className="text-left font-black text-lg">{user.name}</Text>
          <Text className="text-left">{user.occupation}</Text>
        </View>
        <View className=" ml-auto  border-4 rounded-full">
          <Icon name="menu" size={47} />
        </View>
      </SafeAreaView>
    </View>
  ) : null;
};

export default SiteManagerHeader;
