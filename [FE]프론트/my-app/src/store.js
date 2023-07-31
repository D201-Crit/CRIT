// store.js

import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage를 사용하려면 이렇게 임포트

import rootReducer from "./rootReducer"; // rootReducer를 import 하도록 수정

const persistConfig = {
  key: "root",
  storage, //local Storage에 저장
  whitelist: ["users"], //auth Reducer만 저장
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
