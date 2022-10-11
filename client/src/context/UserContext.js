import React, { createContext, useState } from 'react';

const defaultValue = {
  token: "",
  login: () => {}
};

export const AuthUserContext = createContext(defaultValue);

export const AuthUserProvider = (props) => {

  const [authedToken, setAuthedToken] = useState(null);

  const login = (authedToken) => {
    setAuthedToken(authedToken) 
  }

    const authId = {
      token: authedToken,
      login: login
    }
  return (
  <AuthUserContext.Provider value={authId}>
    {props.children}
  </AuthUserContext.Provider>);
}

// export default function AuthConsumer() {
//   return useContext(AuthUserContext);
// }
