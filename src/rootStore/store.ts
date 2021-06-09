import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combinedReducer } from "./rootReducer";
import { rootEpic, epicMiddleware } from "./rootEpic";

const store = configureStore({
  reducer: combinedReducer,
  middleware: [
    ...getDefaultMiddleware({
      thunk: false,
    }),
    epicMiddleware,
  ],
});

epicMiddleware.run(rootEpic);

export default store;
