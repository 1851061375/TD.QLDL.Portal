import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./RootReducer";
import { injectStore } from "../axios";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["auth", "user"],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
injectStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type StoreType = typeof store

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
