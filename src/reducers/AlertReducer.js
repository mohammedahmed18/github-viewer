const AlertReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_ALERT":
      return {
        ...state,
        shown: true,
        msg: action.payload.msg,
        type: action.payload.type,
      };
    case "HIDE_ALERT":
      return {
        ...state,
        shown: false,
      };
  }
};

export default AlertReducer;
