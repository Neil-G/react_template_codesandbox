import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import get from 'lodash.get'
import App from './App'
import allPageConfigs from './configs/pages'

/*
|--------------------------------------------------------------------------
| Pages Configuration
|--------------------------------------------------------------------------
*/
export const redirects = []

/*
|--------------------------------------------------------------------------
| Augmented Routes
|--------------------------------------------------------------------------
*/

class RouteWithUtilsComponent extends React.Component {
  componentDidUpdate() {
    window.scrollTo(0, 0)
    this._checkThatUserCanAccessThisRoute()
  }

  componentDidMount() {
    this._checkThatUserCanAccessThisRoute()
  }

  _checkThatUserCanAccessThisRoute = () => {
    const {
      history: { push },
      location: { pathname },
    } = this.props
  }

  render() {
    return <Route {...this.props} />
  }
}

const RouteWithUtils = withRouter(
  connect(state => ({
    user: get(state, 'session.user', {}),
  }))(RouteWithUtilsComponent),
)

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
        {allPageConfigs.map(({ path, PageComponent }) => {
          return (
            <RouteWithUtils
              key={path}
              exact
              path={path}
              component={
                !!PageComponent ? PageComponent : () => <div>{path}</div>
              }
            />
          )
        })}
      </Switch>
    </App>
  </BrowserRouter>
)
