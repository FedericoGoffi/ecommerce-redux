import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import authReducer from '../slices/authReducer.js'
import cartReducer from '../slices/cartSlice.js'
import { categoriesSlice } from '../slices/categoriesSlice.js'
import { searchSlice } from '../slices/searchSlice.js'
import { offersSlice } from '../slices/offersSlice.js';
import { bestCategoriesSlice } from '../slices/bestCategoriesSlice.js';
import { authSlice } from '../slices/authSlice.js';
import { productDetailsApi } from '../slices/productDetailsSlice.js';

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    [categoriesSlice.reducerPath]: categoriesSlice.reducer,
    [searchSlice.reducerPath]: searchSlice.reducer,
    [offersSlice.reducerPath]: offersSlice.reducer,
    [bestCategoriesSlice.reducerPath]: bestCategoriesSlice.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [productDetailsApi.reducerPath]: productDetailsApi.reducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(authSlice.middleware)
            .concat(categoriesSlice.middleware)
            .concat(searchSlice.middleware)
            .concat(offersSlice.middleware)
            .concat(bestCategoriesSlice.middleware)
            .concat(productDetailsApi.middleware),
});

export const persistor = persistStore(store);
export default store;