import React from 'react'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { get, startCase, capitalize } from 'lodash'
import { SettingsPath, PROFILE_PAGE_PATH } from '../../../constants/urlPaths.js'
import { globalLayout } from '../../../styles'
import updater from '../../../redux/updater'
import { logout } from '../../../utils'
import {
  homePageConfig,
  searchPageConfig,
  managePageConfig,
  messagesPageConfig,
  forumPageConfig,
  profilePageConfig,
  itemsPageConfig,
} from '../../../configs/pages'
import { light } from '../../../styles/colors'
import TetherComponent from 'react-tether'
import NavItemWithSubmenu from './NavItemWithSubmenu'
const withClickOutside = require('react-click-outside')

/*
|--------------------------------------------------------------------------
| Styled Components
|--------------------------------------------------------------------------
*/

const Container = styled.div`
  background: white;
  border-bottom: 1px solid ${light};
  position: fixed;
  top: 0;
  width: 100%;
  height: ${globalLayout.topNavHeightPx};
  display: flex;
  justify-content: space-between;
  z-index: 1000;
`

const DesktopNavItemContainer = styled.div`
  display: flex;
  @media (max-width: 720px) {
    display: none;
  }
`

const NavItem = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  position: relative;
  border-bottom: 5px solid ${({ isActive }) => (isActive ? 'tomato' : 'white')};
  &:hover {
    border-bottom: 5px solid
      ${({ isActive }) => (isActive ? 'tomato' : '#ffcdd2')};
  }
  a {
    color: #2b2d42;
    text-decoration: none;
  }
  > .user-menu-icon {
    font-size: 30px;
  }
  > .user-menu-dropdown {
    margin-left: 8px;
    cursor: pointer;
  }
`

/*
|--------------------------------------------------------------------------
| User Menu
|--------------------------------------------------------------------------
*/

const UserMenuButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 18px;
  @media (max-width: 720px) {
    display: none;
  }
`

const UserMenuContainer = styled.div`
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  position: absolute;
  width: 200px;
  top: ${globalLayout.topNavHeightPx};
  right: 12px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  z-index: 1000;
`

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
`

class UserMenuComponent extends React.Component {
  handleClickOutside = evt => {
    if (evt.target.id !== 'user-menu-toggle-icon') {
      this._closeMenu()
    }
  }

  _closeMenu = () => {
    updater.toggleOpenGlobal({
      componentName: 'topNav',
      shouldOpenComponent: false,
    })
  }

  render() {
    return (
      <UserMenuContainer>
        <UserMenuItem>signed in as UserName</UserMenuItem>
        <Link to={PROFILE_PAGE_PATH} onClick={() => this._closeMenu()}>
          <UserMenuItem>
            <i className='fal fa-id-card' />
            Your Profile
          </UserMenuItem>
        </Link>
        <Link to={SettingsPath} onClick={() => this._closeMenu()}>
          <UserMenuItem>
            <i className='fal fa-cog' />
            Settings
          </UserMenuItem>
        </Link>
        <UserMenuItem onClick={logout}>
          <i className='fal fa-sign-out-alt' />
          Logout
        </UserMenuItem>
      </UserMenuContainer>
    )
  }
}

const UserMenu = withClickOutside(UserMenuComponent)

/*
|--------------------------------------------------------------------------
| Desktop Sub Menu Options
|--------------------------------------------------------------------------
*/

const SubNavLinkItem = styled(Link)`
  display: block;
  padding: 9px;
  text-decoration: none;
  border-right: 5px solid ${({ isActive }) => (isActive ? 'tomato' : 'white')};
  &:hover {
    border-right: 5px solid
      ${({ isActive }) => (isActive ? 'tomato' : '#ffcdd2')};
  }
`

/*
|--------------------------------------------------------------------------
| Mobile Menu
|--------------------------------------------------------------------------
*/

const MobileMenuButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 18px;
  @media (min-width: 720px) {
    display: none;
  }
`

const MobileMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  position: fixed;
  border-top: 1px solid ${light};
  top: ${globalLayout.topNavHeightPx};
  right: 0px;
  bottom: 0px;
  left: 0px;
  a {
    color: #333;
    text-decoration: none;
  }
`

const MobileNavItem = styled.div`
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 540px) {
    display: none;
  }
`
const mobileMenuItems = [
  homePageConfig,
  itemsPageConfig,
  searchPageConfig,
  managePageConfig,
  messagesPageConfig,
  forumPageConfig,
  profilePageConfig,
]

const MobileMenu = ({ closeMobileMenu }) => {
  return (
    <MobileMenuContainer>
      {mobileMenuItems.map(({ label, path }) => {
        return (
          <Link to={path} onClick={closeMobileMenu}>
            <MobileNavItem>{label}</MobileNavItem>
          </Link>
        )
      })}
      <MobileNavItem onClick={logout}>Logout</MobileNavItem>
    </MobileMenuContainer>
  )
}

/*
|--------------------------------------------------------------------------
| TopNav Component
|--------------------------------------------------------------------------
*/

const desktopNavItems = [
  homePageConfig,
  itemsPageConfig,
  searchPageConfig,
  managePageConfig,
  messagesPageConfig,
  forumPageConfig,
  profilePageConfig,
]

class TopNav extends React.Component {
  state = {
    isMobileMenuOpen: false,
    openNavSubitemMenu: undefined,
    isUserMenuOpen: false,
  }

  _renderDesktopNavItems = () => {
    const { history } = this.props
    const { openNavSubitemMenu } = this.state
    return (
      <DesktopNavItemContainer>
        {/*  NDesktop Nav Items */}
        {desktopNavItems.map(navItemConfig => (
          <NavItemWithSubmenu
            {...navItemConfig}
            history={history}
            openSubmenuName={openNavSubitemMenu}
            setOpenSubmenuName={submenuName =>
              this.setState({ openNavSubitemMenu: submenuName })
            }
          />
        ))}
      </DesktopNavItemContainer>
    )
  }

  _renderUserMenu = () => {
    const { user } = this.props
    const { isUserMenuOpen } = this.state
    return (
      <UserMenuButtonContainer>
        <i
          className='fal fa-user-circle user-menu-icon'
          style={{ marginRight: '8px', fontSize: '1.5em' }}
        />
        <i
          id='user-menu-toggle-icon'
          className='fas fa-caret-down user-menu-dropdown'
          style={{ cursor: 'pointer' }}
          onClick={() => {
            this.setState({ isUserMenuOpen: !isUserMenuOpen })
          }}
        />
        {isUserMenuOpen && <UserMenu user={user} />}
      </UserMenuButtonContainer>
    )
  }

  _renderMobileMenu = () => {
    const { isMobileMenuOpen } = this.state
    return (
      <MobileMenuButtonContainer>
        <i
          className={isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}
          style={{ cursor: 'pointer' }}
          onClick={() => this.setState({ isMobileMenuOpen: !isMobileMenuOpen })}
        ></i>
        {isMobileMenuOpen && (
          <MobileMenu
            closeMobileMenu={() => this.setState({ isMobileMenuOpen: false })}
          />
        )}
      </MobileMenuButtonContainer>
    )
  }

  render() {
    return (
      <Container
        onMouseLeave={() => this.setState({ openNavSubitemMenu: undefined })}
      >
        {/* Logo */}
        <NavItem key='logo'>
          <Link to={homePageConfig.path}>
            <i className='fal fa-robot logo' />
          </Link>
        </NavItem>

        {/* Center Nav Options */}
        {this._renderDesktopNavItems()}

        {/* Desktop User Menu */}
        {this._renderUserMenu()}

        {/* Mobile hamburger menu button */}
        {this._renderMobileMenu()}
      </Container>
    )
  }
}

/*
|--------------------------------------------------------------------------
| Redux
|--------------------------------------------------------------------------
*/

const mapStateToProps = state => {
  return {
    user: get(state, 'session.user', {}),
  }
}

export default withRouter(connect(mapStateToProps)(TopNav))
