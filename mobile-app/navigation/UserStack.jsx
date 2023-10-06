import React, { useState, useEffect } from 'react';
import { SiteManager, Supplier } from '../constants/RouteConstants';
import SiteManagerStack from './SiteManagerStack';
import SupplierStack from './SupplierStack';

const UserStack = ({ user }) => {
  const uid = user.uid;
  const [occupation, setOccupation] = useState(null);

  useEffect(() => {
    // fetch users occupation
    const fetchOccupation = async () => {
      setOccupation(SiteManager);
    };

    fetchOccupation();
  }, []);

  return occupation === SiteManager ? (
    <SiteManagerStack />
  ) : occupation === Supplier ? (
    <SupplierStack />
  ) : null;
};
export default UserStack;
