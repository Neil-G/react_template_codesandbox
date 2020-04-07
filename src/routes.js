import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import get from 'lodash.get'
import App from './App'
import { allPageConfigs } from './configs/pages'
import EditItemPage from './components/pages/items/edit'
import {
  ITEMS_PAGE_SUBPATH_EDIT,
  ITEMS_PAGE_SUBPATH_PROFILE,
} from './constants/urlPaths'
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
    return <Route exact {...this.props} />
  }
}

const RouteWithUtils = withRouter(
  connect(state => ({
    user: get(state, 'session.user', {}),
  }))(RouteWithUtilsComponent),
)

/*
|--------------------------------------------------------------------------
| Redirects
|--------------------------------------------------------------------------
*/

const customPageConfigs = [
  {
    label: 'Edit Item',
    path: [ITEMS_PAGE_SUBPATH_EDIT, ':itemId'].join('/'),
    PageComponent: EditItemPage,
  },
]

/*
|--------------------------------------------------------------------------
| Redirects
|--------------------------------------------------------------------------
*/

let redirects = []
allPageConfigs.forEach(pageConfig => {
  if (pageConfig.redirects) {
    pageConfig.redirects.forEach(redirect => {
      redirects.push(redirect)
    })
  }
})

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
        {[...customPageConfigs, ...allPageConfigs].map(
          ({ path, PageComponent }) => {
            return (
              <RouteWithUtils
                key={path}
                path={path}
                component={
                  !!PageComponent ? PageComponent : () => <div>{path}</div>
                }
              />
            )
          },
        )}
      </Switch>
    </App>
  </BrowserRouter>
)
