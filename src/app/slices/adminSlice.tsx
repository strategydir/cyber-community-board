import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { readDocuments } from "../controllers/hooks";
import { checkPassword } from "../controllers/passwordController";

const collectionName = "admin";

interface IAdminState {
  adminMode: boolean;
  loading: boolean;
}

const initialState: IAdminState = {
  adminMode: false,
  loading: false,
};

export const comparePassword = createAsyncThunk(
  "admin/login",
  async (password: string) => {
    const data = await readDocuments(collectionName);
    if (data && data.length) {
      const hashedPassword = (data[0] as { password: string }).password;
      const isMatch = await checkPassword(password, hashedPassword);
      return isMatch;
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(comparePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(comparePassword.fulfilled, (state, action) => {
        state.adminMode = action.payload as boolean;
        state.loading = false;
      });
  },
});

export default adminSlice.reducer;
