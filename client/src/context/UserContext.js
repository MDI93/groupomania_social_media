import React, { createContext, useState } from 'react';

const defaultValue = {
  token: "",
  userIsLoggedIn: false,
  login: () => {},
  logout: () => {}
};

export const AuthUserContext = createContext(defaultValue);

export const AuthUserProvider = (props) => {

  const [authedToken, setAuthedToken] = useState(null);
  
  const login = (authedToken) => {
    setAuthedToken(authedToken) 
  }

  const logout = () => {
    setAuthedToken(null)
  }

  const userIsLoggedIn = !!authedToken;
  console.log(userIsLoggedIn)
  const authId = {
    token: authedToken,
    isLoggedIn: userIsLoggedIn,
    login: login,
    logout: logout
    }
  return (
  <AuthUserContext.Provider value={authId}>
    {props.children}
  </AuthUserContext.Provider>);
}

// export default function AuthConsumer() {
//   return useContext(AuthUserContext);
// }
