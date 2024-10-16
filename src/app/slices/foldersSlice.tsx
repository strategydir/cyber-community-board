import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createDocument,
  // deleteDocument,
  readDocuments,
  updateDocument,
  // updateDocument,
} from "../controllers/hooks";

const collectionName = "docList";

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
  const data = await readDocuments(collectionName);
  return data;
});

export const addItem = createAsyncThunk(
  "folders/addItem",
  async (item: IFileList) => {
    // const docRef =
    await createDocument(collectionName, {
      category: item.category,
      data: item.data,
    });
    return;
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const editItem = createAsyncThunk(
  "folders/editItem",
  async (item: IFileList) => {
    await updateDocument(collectionName, item.id as string, item);
    return item;
  }
);

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
      })
      .addCase(addItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addItem.rejected, (state) => {
        state.loading = false;
      })
      .addCase(editItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(editItem.fulfilled, (state) => {
        state.loading = false;
        // const index = state.data.findIndex(
        //   (item) => item.id === action.payload.id
        // );
        // if (index !== -1) {
        //   state.data[index] = action.payload;
        // }
      })
      .addCase(editItem.rejected, (state) => {
        state.loading = false;
      });
    // .addCase(removeItem.fulfilled, (state, action) => {
    //   state.data = state.data.filter((item) => item.id !== action.payload);
    // });
  },
});

export default foldersSlice.reducer;
