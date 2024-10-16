import { configureStore } from "@reduxjs/toolkit";
import foldersSlice from "../slices/foldersSlice";
import adminSlice from "../slices/adminSlice";

const store = configureStore({
  reducer: {
    folders: foldersSlice,
    admin: adminSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
