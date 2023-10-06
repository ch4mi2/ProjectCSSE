import { View, Text, KeyboardAvoidingView, TextInput } from 'react-native';
import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import MainButton from '../components/common/buttons/MainButton';
import SecondaryButton from '../components/common/buttons/SecondaryButton';
import DismissibleAlert from '../components/common/alerts/DismissibleAlert';
import { Picker } from '@react-native-picker/picker';
import {
  SiteManager,
  ProcurementManager,
  Supplier,
  Management,
} from '../constants/RouteConstants';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [isError, setIsError] = useState({
    visibility: false,
    viewStyles: 'border border-4 border-red-600',
    title: null,
    titleStyles: 'text-red-600',
    message: null,
    messageStyles: 'text-red-600 font-bold',
  });
  const [occupation, setOccupation] = useState();
  const occupationList = [
    SiteManager,
    ProcurementManager,
    Supplier,
    Management,
  ];

  const handleSignUp = () => {
    if (!email || !password || !fullName || !rePassword) {
      setIsError((prev) => ({
        ...prev,
        visibility: true,
        title: 'Error !',
        message: 'Please fill all the fields !',
      }));
      return;
    } else if (password !== rePassword) {
      setIsError((prev) => ({
        ...prev,
        visibility: true,
        title: 'Error !',
        message: 'Passwords do not match !',
      }));
      return;
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Registered user: ' + user.email);
        })
        .catch((error) => {
          console.log(error.code);
          if (error.code === 'auth/email-already-in-use') {
            setIsError((prev) => ({
              ...prev,
              visibility: true,
              title: 'Error !',
              message: 'Email already in use !',
            }));
            return;
          } else if (error.code === 'auth/invalid-email') {
            setIsError((prev) => ({
              ...prev,
              visibility: true,
              title: 'Error !',
              message: 'Please enter a valid email !',
            }));
          } else {
            setIsError((prev) => ({
              ...prev,
              visibility: true,
              title: 'Error !',
              message: error.message + ' - ' + error.code,
            }));
          }
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      className="flex-1 justify-center items-center"
    >
      {isError.visibility && (
        <DismissibleAlert data={isError} setData={setIsError} />
      )}
      <Text className="text-3xl text-dark-blue font-bold mb-4 text-center">
        Welcome !
      </Text>
      <View className="w-4/5">
        <TextInput
          className="bg-white mb-2 px-4 py-2 border-[3px] border-dark-blue text-dark-blue rounded-xl"
          placeholder="Full Name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          type="text"
        />
        <View className="border border-4 border-dark-blue bg-white rounded-xl text-black mb-4">
          <Picker
            className="border border-4 px-4 py-2 text-red-300"
            placeholder="Select Occupation"
            selectedValue={occupation}
            dropdownIconColor={'black'}
            dropdownIconRippleColor={'#0284C7'}
            selectionColor={'#0284C7'}
            onValueChange={(itemValue) => setOccupation(itemValue)}
          >
            {occupationList.map((occupation, index) => (
              <Picker.Item key={index} label={occupation} value={occupation} />
            ))}
          </Picker>
        </View>
        <TextInput
          className="bg-white mb-2 px-4 py-2 border-[3px] border-dark-blue text-dark-blue rounded-xl"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          type="email"
        />
        <TextInput
          className="bg-white mb-2 px-4 py-2 border-[3px] border-dark-blue text-dark-blue rounded-xl"
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TextInput
          className="bg-white mb-2 px-4 py-2 border-[3px] border-dark-blue text-dark-blue rounded-xl"
          placeholder="Re-enter Password"
          value={rePassword}
          onChangeText={(text) => setRePassword(text)}
          secureTextEntry
        />
      </View>
      <View>
        <MainButton
          containerStyles={'mt-4'}
          onPress={handleSignUp}
          text="Register"
        />
        <SecondaryButton
          containerStyles={'mt-2'}
          onPress={() => navigation.replace('Login')}
          text="Login"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
