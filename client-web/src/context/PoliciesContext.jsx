import { createContext, useReducer } from 'react';

export const PoliciesContext = createContext();

export const policiesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POLICIES':
      return {
        policies: action.payload,
      };
    case 'CREATE_POLICY':
      return {
        policies: [action.payload, ...state.policies],
      };
    case 'DELETE_POLICY':
      return {
        policies: state.policies.filter((p) => p.id !== action.payload.id),
      };
    case 'FILTER_POLICIES': {
      return {
        policies: state.policies.filter((w) => w.Category === action.cat),
      };
    }
    default:
      return state;
  }
};

import PropTypes from 'prop-types';

export const PoliciesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(policiesReducer, {
    policies: null,
  });

  return (
    <PoliciesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PoliciesContext.Provider>
  );
};

PoliciesContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
