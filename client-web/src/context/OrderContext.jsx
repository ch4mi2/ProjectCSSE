import { createContext, useReducer } from 'react';

export const OrderContext = createContext();

export const orderReducer = (state, action) => {
    if (action.type === 'SET_ORDERS') {
        return {
          orders: action.payload,
        };
      }
    return state;
};


// Create the OrderContextProvider component
export const OrderContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(orderReducer, {
        orders: [],
    });
  
    return (
      <OrderContext.Provider value={{ ...state, dispatch }}>
        {children}
      </OrderContext.Provider>
    );
};

