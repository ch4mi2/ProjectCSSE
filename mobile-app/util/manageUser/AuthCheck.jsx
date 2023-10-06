import React, { useEffect } from 'react';
import { auth } from '../../firebase';
import { useNavigation } from '@react-navigation/native';

const AuthCheck = (WrappedComponent) => {
  const ComponentWithAuthCheck = (props) => {
    const navigation = useNavigation();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) {
          // User is not logged in, navigate to the login screen
          navigation.replace('login');
        }
      });

      return unsubscribe; // Unsubscribe from the auth state listener when component unmounts
    }, []);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuthCheck;
};

export default AuthCheck;
