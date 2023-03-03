const func =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === "function") action(dispatch, getState);
    else next(action);

    console.log("in the func");
  };

export default func;
