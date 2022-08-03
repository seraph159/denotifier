import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { createWrapper } from "next-redux-wrapper"
import {rootReducer} from "./rootReducer"
import { persistStore } from 'redux-persist';
const storage = require('redux-persist/lib/storage').default

const middleware = [thunk]

const makeStore = ({ isServer }) => {
    if (isServer) {
      //If it's on server side, create a store
      return createStore(rootReducer, compose(applyMiddleware(...middleware)));
    } else {
      //If it's on client side, create a store which will persist
      const { persistStore, persistReducer } = require('redux-persist');
  
      const persistConfig = {
        key: 'nextjs',
        whitelist: ['user'], 
        storage, 
      };
  
      const persistedReducer = persistReducer(persistConfig, rootReducer); // Create a new reducer with our existing reducer
  
      const store = createStore(persistedReducer, 
        compose(applyMiddleware(...middleware)))

      store.__persistor = persistStore(store); 
  
      return store;
    }
  };
  
  
  export const wrapper = createWrapper(makeStore);