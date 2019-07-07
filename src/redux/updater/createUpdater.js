import axios from "axios";
import updaterMethods from "./updaterMethods";
import storeBranches from "./../store/storeBranches";
const allStoreBranches = Object.keys(storeBranches);
export default ({ store }) => {
  /*
  |--------------------------------------------------------------------------
  | Dispatches actions in an action group 
  |--------------------------------------------------------------------------
  */
  const processActionGroup = ({ res, error, actionGroup = {} }) => {
    Object.keys(actionGroup).forEach(actionName => {
      const action = actionGroup[actionName];
      const { type, description, updateFunction, uiEventFunction } = action;
      // check that type proper type is provided
      if (type === undefined) {
        return console.log(
          [
            `You forgot to specify a type for action "${actionName}".`,
            `Please choose one of these types: ${allStoreBranches.join(", ")}`
          ].join("\n")
        );
      }
      if (!allStoreBranches.includes(type)) {
        return console.log(
          [
            `You chose "${type}" type for action "${actionName}".`,
            `Please choose one of these types: ${allStoreBranches.join(", ")}`
          ].join("\n")
        );
      }
      // fire associated, non-store-updating ui event
      if (uiEventFunction) {
        uiEventFunction({ res, error, store: store.getState() });
      }

      // dispatch action
      if (updateFunction) {
        store.dispatch({
          actionName,
          description,
          type,
          // give updateFunction access to api and store data
          updateFunction: updateFunction.bind(null, {
            res,
            error,
            store: store.getState()
          })
        });
      }
    });
  };
  /*
  |--------------------------------------------------------------------------
  | Update Types, selected by the updateType attribute
  |--------------------------------------------------------------------------
  */
  const updateTypes = {
    /* Synchronous store updates, does not initiate no network activity */
    store: instructions => {
      const { actions } = instructions;
      processActionGroup({ actionGroup: actions });
      return true;
    },

    /*  Store updates relying on network communication, based on axios api */
    api: instructions => {
      const {
        beforeActions,
        successActions,
        failureActions,
        afterActions,
        serviceOptions
      } = instructions;

      processActionGroup({ actionGroup: beforeActions });

      return axios(serviceOptions || {})
        .then(res => {
          processActionGroup({ res, actionGroup: successActions });
          processActionGroup({ actionGroup: afterActions });
          return res;
        })
        .catch(error => {
          processActionGroup({ error, actionGroup: failureActions });
          processActionGroup({ actionGroup: afterActions });
          return error;
        });
    }
  };

  /*
  |--------------------------------------------------------------------------
  | The updater takes args to make the updateSchema and determines the updater
  |--------------------------------------------------------------------------
  */
  const allUpdateTypes = Object.keys(updateTypes);
  const updater = {};
  // attach updaterMethods to updater
  Object.keys(updaterMethods).forEach(updaterMethod => {
    const updateSchemaFunction = updaterMethods[updaterMethod];
    updater[updaterMethod] = args => {
      // make the update object from the updaterMethod
      const instructions = updateSchemaFunction(args);
      const { updateType } = instructions;
      // check that proper updateType is provided
      if (updateType === undefined) {
        return console.log(
          [
            `You forgot to specify an updateType for updaterMethod "${updaterMethod}".`,
            `Please choose one of these types: ${allUpdateTypes.join(", ")}`
          ].join("\n")
        );
      }
      if (!allUpdateTypes.includes(updateType)) {
        return console.log(
          [
            `You chose "${updateType}" updateType for updaterMethod "${updaterMethod}".`,
            `Please choose one of these types: ${allUpdateTypes.join(", ")}`
          ].join("\n")
        );
      }
      // process actionGroups
      return updateTypes[instructions.updateType](instructions);
    };
  });
  return updater;
};
