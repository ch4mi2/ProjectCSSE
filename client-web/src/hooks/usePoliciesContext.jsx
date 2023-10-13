import { useContext } from 'react';
import { PoliciesContext } from '../context/PoliciesContext';

export const usePoliciesContext = () => {
  const context = useContext(PoliciesContext);

  if (!context) {
    throw Error(
      'usePoliciesContext must be used within a PoliciesContextProvider'
    );
  }

  return context;
};
