import React from "react";
import { TopNav, Footer } from "./components/global";
import { FullScreenLoadingIndicator } from "./components/shared";
import { withRouter } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import get from "lodash.get";
import { globalLayout } from "./styles";
import store from "./redux/store";
const { Provider } = require("react-redux");

/*
|--------------------------------------------------------------------------
| Styled Components
|--------------------------------------------------------------------------
*/

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

const PageContainer = styled.div`
  padding: ${globalLayout.topNavHeight + 18}px 0;
`;

/*
|--------------------------------------------------------------------------
| Application View Container
|--------------------------------------------------------------------------
*/

class AppComponent extends React.Component {
  _handleRoutingOnLogin = () => {
    const {
      history: { push },
      location: { pathname }
    } = this.props;
  };

  componentDidUpdate(prevProps) {
    const { isLoggedIn } = this.props;
    if (!prevProps.isLoggedIn && isLoggedIn) {
      this._handleRoutingOnLogin();
    }
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <Container>
        {isLoggedIn ? (
          this.props.children
        ) : (
          <FullScreenLoadingIndicator text="this is a loading indicator" />
        )}
      </Container>
    );
  }
}

const App = withRouter(
  connect(state => ({
    isLoggedIn: !!get(state, "session.user.id", true),
    user: get(state, "session.user", {})
  }))(AppComponent)
);

/*
|--------------------------------------------------------------------------
| Main Export
|--------------------------------------------------------------------------
*/

export default ({ children }) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App>
          <TopNav />
          <PageContainer>{children}</PageContainer>
          <Footer />
        </App>
      </Provider>
    </BrowserRouter>
  );
};
