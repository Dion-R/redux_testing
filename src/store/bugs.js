import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugAdded: (state, action) => {
      state.list.push(action.payload);
    },
    bugResolved: (state, action) => {
      state.list.map((bug) =>
        bug.id !== action.payload.id ? bug : (bug.resolved = true)
      );
    },
    bugRemoved: (state, action) => {
      state.list.filter((bug) => bug.id !== action.payload.id);
    },
    bugAssignToUser: (state, action) => {
      const { id, userId } = action.payload;
      const index = state.list.findIndex((bug) => bug.id === id);
      state.list[index].userId = userId;
    },
    bugsReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
    },
    bugsRequested: (state, action) => {
      state.loading = true;
    },
    bugsRequestFailed: (state, action) => {
      state.loading = false;
    },
  },
});

const {
  bugAdded,
  bugResolved,
  bugRemoved,
  bugAssignToUser,
  bugsReceived,
  bugsRequested,
  bugsRequestFailed,
} = slice.actions;

export default slice.reducer;

// action creators
const url = "./bugs";

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  const diffMinutes = moment().diff(moment(lastFetch), "minutes");

  if (diffMinutes < 10) return;

  dispatch(
    apiCallBegan({
      url,
      onSuccess: bugsReceived.type,
      onStart: bugsRequested.type,
      onError: bugsRequestFailed.type,
    })
  );
};

export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

export const resolveBug = (id) =>
  apiCallBegan({
    url: url + "/" + id,
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });

export const assignBugToUser = (bugId, userId) =>
  apiCallBegan({
    url: url + "/" + bugId,
    method: "patch",
    data: { userId },
    onSuccess: bugAssignToUser.type,
  });

export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bug) => !bug.resolved)
);

export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );
