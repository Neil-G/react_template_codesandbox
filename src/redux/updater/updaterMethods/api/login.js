export default ({}) => {
  return {
    updateType: "store",
    actions: {
      login: {
        type: "update_session",
        updateFunction: ({}, state) => {
          return { ...state, user: { id: 1, email: "neil@gmail.com" } };
        }
      }
    }
  };
};
