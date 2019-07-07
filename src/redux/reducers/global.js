const initialState = {
  isOpen: {
    topNav: false
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "update_global":
      return action.updateFunction(state) || state;
    default:
      return state;
  }
};
