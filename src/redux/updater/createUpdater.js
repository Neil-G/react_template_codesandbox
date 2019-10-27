import axios from "axios";
import updaterMethods from "./updaterMethods";
import storeBranches from "./../store/storeBranches";
const allStoreBranches = Object.keys(storeBranches);
const config = require('../../config').default[process.env.NODE_ENV]

export default ({ store }) => {
  /*
  |--------------------------------------------------------------------------
  | Dispatches actions in an action group 
  |--------------------------------------------------------------------------
  */
  const processActionGroup = ({
    res,
    error,
    actionGroup = [],
    updaterMethod
  }) => {
    actionGroup.forEach(
      ({ name, type, description, updateFunction, uiEventFunction }) => {
        // check that type proper type is provided
        if (type === undefined && !!updateFunction) {
          return console.log(
            [
              `You forgot to specify a type for action "${name ||
                "[name unprovided]"}" in updaterMethod "${updaterMethod}".`,
              `Please choose one of these action types: ${allStoreBranches.join(
                ", "
              )}`
            ].join("\n")
          );
        }
        if (!allStoreBranches.includes(type) && !!updateFunction) {
          return console.log(
            [
              `You chose "${type}" action type for action "${name ||
                "[name unprovided]"}" in updaterMethod "${updaterMethod}".`,
              `Please choose one of these action types: ${allStoreBranches.join(
                ", "
              )}`
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
            name,
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
      }
    );
  };
  /*
  |--------------------------------------------------------------------------
  | Update Types, selected by the updateType attribute
  |--------------------------------------------------------------------------
  */
  const updateTypes = {
    /* Synchronous store updates, does not initiate no network activity */
    store: instructions => {
      const { actions, updaterMethod } = instructions;
      processActionGroup({ actionGroup: actions, updaterMethod });
      return true;
    },

    /*  Store updates relying on network communication, based on axios api */
    api: instructions => {
      const {
        beforeActions,
        successActions,
        failureActions,
        afterActions,
        serviceOptions,
        updaterMethod
      } = instructions;

      processActionGroup({ actionGroup: beforeActions, updaterMethod });

      // append baseurl to url
      if (config.baseUrl) {
        serviceOptions.url = config.baseUrl + serviceOptions.url
      }

      // if token is found in local storage, include it in header
      const token = localStorage.getItem('token')
      if (!!token) {
        if (!serviceOptions.headers) {
          serviceOptions.headers = {}
        }
        serviceOptions.headers.token = token
      }

      return axios(serviceOptions || {})
        .then(res => {
          processActionGroup({
            res,
            actionGroup: successActions,
            updaterMethod
          });
          processActionGroup({ actionGroup: afterActions, updaterMethod });
          return res;
        })
        .catch(error => {
          processActionGroup({
            error,
            actionGroup: failureActions,
            updaterMethod
          });
          processActionGroup({ actionGroup: afterActions, updaterMethod });
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
      instructions.updaterMethod = updaterMethod;

      // check that proper updateType is provided
      const { updateType } = instructions;
      if (updateType === undefined) {
        return console.log(
          [
            `You forgot to specify an updateType for updaterMethod "${updaterMethod}".`,
            `Please choose one of these updateTypes: ${allUpdateTypes.join(
              ", "
            )}`
          ].join("\n")
        );
      }
      if (!allUpdateTypes.includes(updateType)) {
        return console.log(
          [
            `You chose "${updateType}" updateType for updaterMethod "${updaterMethod}".`,
            `Please choose one of these updateTypes: ${allUpdateTypes.join(
              ", "
            )}`
          ].join("\n")
        );
      }
      // process actionGroups
      return updateTypes[instructions.updateType](instructions);
    };
  });
  return updater;
};
