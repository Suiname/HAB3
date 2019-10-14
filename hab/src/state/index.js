import React, {createContext, useContext, useReducer} from 'react';

export const StateContext = createContext(); // For Class based components

export const StateProvider = ({reducer, initialState, children}) =>(
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

export const initialState = {
  login: {
    userName: '',
    token: '',
    loading: false,
    error: null,
  },
  profile: {
    profile: null,
    loading: false,
  },
};