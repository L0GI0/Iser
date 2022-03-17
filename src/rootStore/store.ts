import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combinedReducer } from "./rootReducer";
import { rootEpic, epicMiddleware } from "./rootEpic";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["accountReducer", 'notifiersReducer'],
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: false
    }),
    epicMiddleware,
  ],
});

epicMiddleware.run(rootEpic);

export default store;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
