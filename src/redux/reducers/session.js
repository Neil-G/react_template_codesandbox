const initialState = {
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "update_session":
      return action.updateFunction(state) || state;
    default:
      return state;
  }
};
