export default storeBranches => {
  const branchNames = Object.keys(storeBranches);
  const reducers = {};

  // create reducer functions
  branchNames.forEach(branchName => {
    reducers[branchName] = (
      state = storeBranches[branchName],
      { type, updateFunction }
    ) => {
      if (type === branchName) {
        return updateFunction(state) || state;
      }
      return state;
    };
  });
  return reducers;
};
