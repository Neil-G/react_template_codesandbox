export default () => {
  return {
    updateType: "store",
    actions: [
      {
        name: "login user",
        type: "session",
        updateFunction: (_, state) => {
          return { ...state, user: { id: 1, email: "neil@gmail.com" } };
        }
      }
    ]
  };
};
