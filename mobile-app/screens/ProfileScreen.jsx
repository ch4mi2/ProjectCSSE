import { View } from 'react-native';
import React from 'react';
import MainButton from '../components/common/buttons/MainButton';
import { auth } from '../firebase';

const ProfileScreen = () => {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log('Signed out');
      })
      .catch((error) => {
        console.log(error.code, error.message);
        alert(error.message);
      });
  };
  return (
    <View>
      <MainButton onPress={handleSignOut} text={'Sign Out'} />
    </View>
  );
};

export default ProfileScreen;
