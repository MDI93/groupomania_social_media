import React, { createContext, useState } from 'react';

const defaultValue = {
  auth: "",
  userIsLoggedIn: false,
  login: () => {},
  logout: () => {}
};

export const AuthUserContext = createContext(defaultValue);

const tokenStorage = localStorage.getItem('token');

export const AuthUserProvider = (props) => {

  const [authedToken, setAuthedToken] = useState(tokenStorage);

  const login = (authedToken) => {
    setAuthedToken(authedToken);
    localStorage.setItem("token", authedToken.token);
  }

  const logout = () => {
    setAuthedToken(null);
    localStorage.clear();
  }

  const userIsLoggedIn = !!authedToken;
  console.log(userIsLoggedIn)

  const authId = {
    auth: authedToken,
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
