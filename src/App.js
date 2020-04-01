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
  padding: ${globalLayout.topNavHeight + 18}px 0;
`

/*
|--------------------------------------------------------------------------
| Application View Container
|--------------------------------------------------------------------------
*/

class AppComponent extends React.Component {
  _handleRoutingOnLogin = () => {
    const {
      history: { push },
      location: { pathname },
    } = this.props
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
          [<TopNav />, <PageContainer>{children}</PageContainer>, <Footer />]
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
