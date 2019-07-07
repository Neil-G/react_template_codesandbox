import axios from "axios";
import updaterMethods from "./updaterMethods";
export default ({ store }) => {
  /*
  |--------------------------------------------------------------------------
  | Map and dispatch each action
  |--------------------------------------------------------------------------
  */
  const processActionGroup = ({ res, error, actionGroup = {} }) => {
    Object.keys(actionGroup).forEach(actionName => {
      const action = actionGroup[actionName];
      const { type, description, updateFunction, uiEventFunction } = action;
      if (uiEventFunction) {
        uiEventFunction({ res, error, store: store.getState() });
      }

      if (updateFunction) {
        store.dispatch({
          actionName,
          description,
          type,
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
  | Updaters, consume intructions and are used for specific types of updates
  |--------------------------------------------------------------------------
  */
  const updaters = {
    /* Synchronous store updates, no network activity */
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

  const updater = {};
  Object.keys(updaterMethods).forEach(updateSchemaName => {
    const updateSchemaFunction = updaterMethods[updateSchemaName];
    updater[updateSchemaName] = args => {
      const instructions = updateSchemaFunction(args);
      return updaters[instructions.updateType](instructions);
    };
  });
  updater.allUpdaterNames = Object.keys(updaterMethods);
  updater.store = store;
  return updater;
};
