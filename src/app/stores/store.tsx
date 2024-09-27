import { configureStore } from "@reduxjs/toolkit";
import foldersSlice from "../slices/foldersSlice";

const store = configureStore({
  reducer: {
    folders: foldersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
