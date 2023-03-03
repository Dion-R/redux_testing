import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    userAdded: (state, action) => {
      state.push({
        user: action.payload.name,
        id: action.payload.id,
      });
    },
  },
});

export default slice.reducer;

export const { userAdded } = slice.actions;
