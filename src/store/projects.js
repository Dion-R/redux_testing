import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    projectAdded: (state, action) => {
      state.push({
        description: action.payload.description,
        resolved: false,
        id: lastId++,
      });
    },
    projectResolved: (state, action) => {
      state.map((bug) =>
        bug.id !== action.payload.id ? { ...bug } : { ...bug, resolved: true }
      );
    },
    projectRemoved: (state, action) => {
      state.filter((bug) => bug.id !== action.payload.id);
    },
  },
});

export default slice.reducer;

export const { projectAdded, projectRemoved, projectResolved } = slice.actions;
