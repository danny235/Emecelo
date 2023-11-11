import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import ordersReducer from '../redux/feathers/ordersSlice';
import productsReducer from '../redux/feathers/productsSlice';
import userReducer, { logoutUser } from "../redux/user/userSlice"

const persistConfig = {
  key: "emecelo",
  storage,
};
const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: { products: productsReducer, orders: ordersReducer, user: persistedReducer },
  middleware: [thunk],
});

export default store;

export const persistor = persistStore(store);


