import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthUserProvider } from './context/UserContext';
// import { Provider } from 'react-redux';
// import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';
// import rootReducer from './reducers/index'; 
// import { getPost, GET_POSTS } from './actions/post.actions';


// const store = configureStore({
//   reducer: rootReducer,
//   middleware: applyMiddleware[thunk],
//   logger: logger
// });

// console.log("store get state", store.getState());
// store.subscribe(() => console.log(store.getState()));
// store.dispatch(getPost(), GET_POSTS);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthUserProvider>
    {/* <Provider store={store}> */}
        <App />
    {/* </Provider> */}
  </AuthUserProvider>
)