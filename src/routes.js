import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import get from "lodash.get";
import {
  Page1Path,
  Page2Path,
  rootPath,
  SettingsPath,
  UserProfile
} from "./constants/urlPaths.js";
import ProfilePage from "./components/pages/profile";
import DocsPage from "./components/pages/docs";
import App from "./App";

/*
|--------------------------------------------------------------------------
| Pages Configuration
|--------------------------------------------------------------------------
*/
export const redirects = [];

export const pages = [
  { path: rootPath },
  { path: Page1Path },
  { path: Page2Path },
  { path: SettingsPath },
  { path: UserProfile, component: ProfilePage },
  { path: '/docs', component: DocsPage }
];

/*
|--------------------------------------------------------------------------
| Augmented Routes
|--------------------------------------------------------------------------
*/

class RouteWithUtilsComponent extends React.Component {
  componentDidUpdate() {
    window.scrollTo(0, 0);
    this._checkThatUserCanAccessThisRoute();
  }

  _checkThatUserCanAccessThisRoute = () => {
    const {
      history: { push },
      location: { pathname }
    } = this.props;
  };

  render() {
    return <Route {...this.props} />;
  }
}

const RouteWithUtils = withRouter(
  connect(state => ({
    user: get(state, "session.user", {})
  }))(RouteWithUtilsComponent)
);

/*
|--------------------------------------------------------------------------
| All Routes
|--------------------------------------------------------------------------
*/

export default (
  <BrowserRouter>
    <App>
      <Switch>
        {redirects.map(redirect => (
          <Redirect exact {...redirect} />
        ))}
        {pages.map(({ path, component }) => {
          return (
            <RouteWithUtils
              key={path}
              exact
              path={path}
              component={!!component ? component : () => <div>{path}</div>}
            />
          );
        })}
      </Switch>
    </App>
  </BrowserRouter>
);
