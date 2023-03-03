const logger = (param) => (store) => (next) => (action) => {
  console.log("loggin", param);
  next(action);
};

export default logger;
