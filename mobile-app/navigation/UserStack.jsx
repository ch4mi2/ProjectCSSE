import React, { useState, useEffect } from 'react';
import { SiteManager, Supplier } from '../constants/RouteConstants';
import SiteManagerView from './SiteManagerView';
import SupplierView from './SupplierView';

const UserStack = ({ user }) => {
  const uid = user.uid;
  const [userDetails, setUserDetails] = useState({
    name: null,
    occupation: null,
    email: null,
    img: null,
  });

  useEffect(() => {
    // fetch users occupation
    const fetchOccupation = async () => {
      setUserDetails({
        name: 'John Doe',
        occupation: SiteManager,
        email: 'john@example.com',
        img: require('../assets/images/DefaultUser.png'),
      });
    };

    fetchOccupation();
  }, []);

  return userDetails.occupation === SiteManager ? (
    <SiteManagerView user={userDetails} />
  ) : userDetails.occupation === Supplier ? (
    <SupplierView />
  ) : null;
};
export default UserStack;
