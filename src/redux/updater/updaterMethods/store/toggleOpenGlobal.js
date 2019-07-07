// opens and closes global components
// by default, toggles a component,
// but can be given a specific state to set component state to
export default ({ componentName, shouldOpenComponent }) => {
  return {
    updateType: "store",
    actions: [
      {
        name: "open/close global component",
        type: "global",
        updateFunction: (_, state) => {
          const isComponentOpen = state.isOpen[componentName];

          const isOpen = {
            ...state.isOpen,
            [componentName]:
              shouldOpenComponent === undefined
                ? !isComponentOpen
                : shouldOpenComponent
          };
          return { ...state, isOpen };
        }
      }
    ]
  };
};
