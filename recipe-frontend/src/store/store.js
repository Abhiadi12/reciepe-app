import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "./authSlice";
import alertReducer from "./alertSlice";
import filterRecipeReducer from "./filterRecipeSlice";

// Persist config for auth slice
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Persist only the auth slice
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer, // Auth state will be persisted
  alert: alertReducer, // Alert state will not be persisted
  filterRecipe: filterRecipeReducer, // Filter recipe state will not be persisted
});

// Persist only the auth part of the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable checks for redux-persist compatibility
    }),
});

// Persistor for the store
const persistor = persistStore(store);

export { store, persistor };
