import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combinedReducer } from "./rootReducer";
import { rootEpic, epicMiddleware } from "./rootEpic";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["accountReducer"],
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    ...getDefaultMiddleware({
      thunk: false,
    }),
    epicMiddleware,
  ],
});

epicMiddleware.run(rootEpic);

export default store;

export const persistor = persistStore(store);
