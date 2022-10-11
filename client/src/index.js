import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index'; 

//Dev tools
import { logger } from 'redux-logger';
import { AuthUserProvider } from './context/UserContext';


const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, logger],
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthUserProvider>
    <Provider store={store}>
        <App />
    </Provider>
  </AuthUserProvider>
)