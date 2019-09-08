import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import {
  rootPath,
  Page1Path,
  Page2Path,
  SettingsPath,
  UserProfile
} from "./../../constants/urlPaths.js";
import { globalLayout } from "./../../styles";
import updater from "./../../redux/updater";

const withClickOutside = require("react-click-outside");

/*
|--------------------------------------------------------------------------
| Styled Components
|--------------------------------------------------------------------------
*/

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: ${globalLayout.topNavHeightPx};
  display: flex;
  justify-content: space-between;
  background: #ede7f6;
`;

const SectionContainer = styled.div`
  display: flex;
`;

const SectionContainerLeft = styled(SectionContainer)``;

const SectionContainerRight = styled(SectionContainer)``;

const TopNavItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  position: relative;
  > .user-menu-icon {
    font-size: 30px;
  }
  > .user-menu-dropdown {
    margin-left: 8px;
    cursor: pointer;
  }
  > .logo {
    font-size: 30px;
  }
`;

const UserMenuContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.3);
  position: absolute;
  width: 200px;
  top: ${globalLayout.topNavHeightPx};
  right: 12px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
`;

const UserMenuItem = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  padding: 6px;
  cursor: pointer;
  &:hover {
    background: snow;
  }
  > i {
    margin-right: 9px;
  }
`;

/*
|--------------------------------------------------------------------------
| User Menu Component
|--------------------------------------------------------------------------
*/

class UserMenuNavItemComponent extends React.Component {
  handleClickOutside = evt => {
    if (evt.target.id !== "user-menu-toggle-icon") {
      this._closeMenu();
    }
  };

  _closeMenu = () => {
    updater.toggleOpenGlobal({
      componentName: "topNav",
      shouldOpenComponent: false
    });
  };

  render() {
    return (
      <UserMenuContainer>
        <UserMenuItem>signed in as UserName</UserMenuItem>
        <Link to={UserProfile} onClick={() => this._closeMenu()}>
          <UserMenuItem>
            <i className="fal fa-id-card" />
            Your Profile
          </UserMenuItem>
        </Link>
        <Link to={SettingsPath} onClick={() => this._closeMenu()}>
          <UserMenuItem>
            <i className="fal fa-cog" />
            Settings
          </UserMenuItem>
        </Link>
        <UserMenuItem
          onClick={() => {
            localStorage.removeItem('token')
            return window.location.href = 'http://localhost:5678?action=logout'
          }}
        >
          <i className="fal fa-sign-out-alt" />
          Logout
        </UserMenuItem>
      </UserMenuContainer>
    );
  }
}

const UserMenuNavItem = withClickOutside(UserMenuNavItemComponent);

/*
|--------------------------------------------------------------------------
| TopNav component
|--------------------------------------------------------------------------
*/
const topNavItems = [
  { label: <i className="fal fa-robot logo" />, to: rootPath },
  { label: "NavItem 1", to: Page1Path },
  { label: "NavItem 2", to: Page2Path }
];
class TopNav extends React.Component {
  render() {
    const { isUserMenuOpen } = this.props;
    return (
      <Container>
        {/* Left Section */}
        <SectionContainerLeft>
          {topNavItems.map(({ label, to }) => {
            return (
              <TopNavItem key={label}>
                <Link to={to}>{label}</Link>
              </TopNavItem>
            );
          })}
        </SectionContainerLeft>

        {/* Right Section */}
        <SectionContainerRight>
          <TopNavItem>
            <i className="fal fa-user-circle user-menu-icon" />
            <i
              id="user-menu-toggle-icon"
              className="fas fa-caret-down user-menu-dropdown"
              onClick={() => {
                updater.toggleOpenGlobal({
                  componentName: "topNav"
                });
              }}
            />
            {isUserMenuOpen && <UserMenuNavItem />}
          </TopNavItem>
        </SectionContainerRight>
      </Container>
    );
  }
}

/*
|--------------------------------------------------------------------------
| Redux
|--------------------------------------------------------------------------
*/

const mapStateToProps = state => {
  return {
    isUserMenuOpen: state.global.isOpen.topNav
  };
};

export default withRouter(connect(mapStateToProps)(TopNav));
