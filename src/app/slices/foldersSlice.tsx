import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createDocument,
  // deleteDocument,
  readDocuments,
  // updateDocument,
} from "../controllers/hooks";
import { docList } from "../config/firebase";

interface IFileList {
  id: string;
  category: string;
  data: IItem[];
}

interface IItem {
  title: string;
  link: string;
}

interface IFilstListState {
  data: IFileList[];
  loading: boolean;
}

const initialState: IFilstListState = {
  data: [],
  loading: false,
};

export const fetchItems = createAsyncThunk("folders/fetch", async () => {
  const data = await readDocuments(docList);
  return data;
});

export const addItem = createAsyncThunk(
  "folders/addItem",
  async (name: unknown) => {
    const docRef = await createDocument(docList, { name });
    return { id: docRef?.id, name };
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const editItem = createAsyncThunk(
//   "folders/editItem",
//   async (item: IFileList) => {
//     await updateDocument(docList, item.id as string, { name: item.name });
//     return item;
//   }
// );

// export const removeItem = createAsyncThunk(
//   "folders/removeItem",
//   async (id: string) => {
//     await deleteDocument(docList, id);
//     return id;
//   }
// );

const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.data = action.payload as IFileList[];
        state.loading = false;
      });
    // .addCase(addItem.fulfilled, (state, action) => {
    //   state.data.push(action.payload as IFileList);
    // })
    // .addCase(editItem.fulfilled, (state, action) => {
    //   const index = state.data.findIndex(
    //     (item) => item.id === action.payload.id
    //   );
    //   if (index !== -1) {
    //     state.data[index] = action.payload;
    //   }
    // })
    // .addCase(removeItem.fulfilled, (state, action) => {
    //   state.data = state.data.filter((item) => item.id !== action.payload);
    // });
  },
});

export default foldersSlice.reducer;
