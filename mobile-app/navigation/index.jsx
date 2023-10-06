import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import UserStack from './UserStack';
import GuestStack from './GuestStack';

export default function RootNavigation() {
  const [user, setUser] = useState();
  useEffect(() => {
    const unsubscribeFromAuthStateChanged = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStateChanged;
  }, []);

  return user ? <UserStack user={user} /> : <GuestStack />;
}
