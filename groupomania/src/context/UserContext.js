import React, { createContext, useState } from 'react';

const defaultValue = {
  auth: null,
  userIsLoggedIn: false,
  userId: null,
  role: null,
  login: () => {},
  logout: () => {}
};

export const AuthUserContext = createContext(defaultValue);

const tokenStorage = localStorage.getItem('token');
const userIdStorage = localStorage.getItem('userId');
const roleStorage = localStorage.getItem('role');

export const AuthUserProvider = (props) => {

  const [authedToken, setAuthedToken] = useState(tokenStorage);
  const [userId, setUserId] = useState(userIdStorage);
  const [role, setRole] = useState(roleStorage);

  const login = (authedToken) => {
    setAuthedToken(authedToken.token);
    setUserId(authedToken.userId);
    setRole(authedToken.role);
    localStorage.setItem("token", authedToken.token);
    localStorage.setItem("userId", authedToken.userId);
    localStorage.setItem("role", authedToken.role);
  };

  const logout = () => {
    setAuthedToken(null);
    localStorage.clear();
  };

  const userIsLoggedIn = !!authedToken;

  const authId = {
    auth: authedToken,
    isLoggedIn: userIsLoggedIn,
    userId: userId,
    role: role,
    login: login,
    logout: logout
  };

  return (
  <AuthUserContext.Provider value={authId}>
    {props.children}
  </AuthUserContext.Provider>);
};
