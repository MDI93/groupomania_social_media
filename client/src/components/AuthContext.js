import { createContext } from "react";
// import React, { useEffect, useState } from 'react';
// import { AuthContext } from './components/AuthContext';

// import Axios from 'axios';

export const AuthContext = createContext();


// import * as React from "react";

// const authContext = React.createContext();

// function useAuth() {
//   const [authed, setAuthed] = React.useState(false);

//   return {
//     authed,
//     login() {
//       return new Promise((res) => {
//         setAuthed(true);
//         res();
//       });
//     },
//     logout() {
//       return new Promise((res) => {
//         setAuthed(false);
//         res();
//       });
//     },
//   };
// }

// export function AuthProvider({ children }) {
//   const auth = useAuth();

//   return <authContext.Provider value={auth}>{children}</authContext.Provider>;
// }

// export default function AuthConsumer() {
//   return React.useContext(authContext);
// }

 // const [authed, setAuthed] = useState(null);

  // useEffect(() => {
  //   const fetchAuth = async() => {
  //     await Axios({
  //       method: "get",
  //       url: 'http://localhost:5000/api/auth'
  //     })
  //     .then((res) => setAuthed(res.data))
  //     .catch((err) => console.log("Non valide"))
  //   }
  //   fetchAuth();
  // }, [authed]);