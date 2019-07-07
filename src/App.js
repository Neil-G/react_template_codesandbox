import React from "react";
import { TopNav, Footer } from "./components/global";
import { withRouter } from "react-router";
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import get from "lodash.get";
import { globalLayout } from "./styles";
import store from "./redux/store";
import updater from "./redux/updater";
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
          <div onClick={() => updater.login({})}>Loading your information</div>
        )}
      </Container>
    );
  }
}

const App = withRouter(
  connect(state => ({
    isLoggedIn: !!get(state, "session.user.id"),
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
