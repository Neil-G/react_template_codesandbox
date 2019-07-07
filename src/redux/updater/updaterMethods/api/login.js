export default ({}) => {
  return {
    updateType: "store",
    actions: {
      login: {
        type: "session",
        updateFunction: ({}, state) => {
          return { ...state, user: { id: 1, email: "neil@gmail.com" } };
        }
      }
    }
  };
};
