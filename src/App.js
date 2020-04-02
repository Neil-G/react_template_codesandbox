import React from 'react'
import { TopNav, Footer } from './components/global'
import { FullScreenLoadingIndicator } from './components/shared'
import { withRouter } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { globalLayout } from './styles'
import { snow } from './styles/colors'
import store from './redux/store'
import { allPageConfigs } from './configs/pages'
const { Provider } = require('react-redux')

/*
|--------------------------------------------------------------------------
| Styled Components
|--------------------------------------------------------------------------
*/

const Container = styled.div`
  background: ${snow};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`

const PageContainer = styled.div`
  padding: ${globalLayout.topNavHeight}px 0;
`

const pageUrlPathsToHideFooter = allPageConfigs
  .filter(({ showFooter }) => showFooter === false)
  .map(({ path }) => path)
/*
|--------------------------------------------------------------------------
| Application View Container
|--------------------------------------------------------------------------
*/

class AppComponent extends React.Component {
  _handleRoutingOnLogin = () => {}

  _shouldRenderFooter = () => {
    const {
      location: { pathname },
    } = this.props
    return pageUrlPathsToHideFooter.every(path => {
      return !pathname.includes(path)
    })
  }

  componentDidUpdate(prevProps) {
    const { isLoggedIn } = this.props
    if (!prevProps.isLoggedIn && isLoggedIn) {
      this._handleRoutingOnLogin()
    }
  }

  render() {
    const { isLoggedIn, children } = this.props
    return (
      <Container>
        {isLoggedIn ? (
          <>
            <TopNav />
            <PageContainer>{children}</PageContainer>
            {this._shouldRenderFooter() && <Footer />}
          </>
        ) : (
          <FullScreenLoadingIndicator text='this is a loading indicator' />
        )}
      </Container>
    )
  }
}

const App = withRouter(
  connect(state => ({
    isLoggedIn: state.session.userId,
  }))(AppComponent),
)

/*
|--------------------------------------------------------------------------
| Main Export
|--------------------------------------------------------------------------
*/

export default ({ children }) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App>{children}</App>
      </Provider>
    </BrowserRouter>
  )
}
