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
import UserMenu from './UserMenu'
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
        <UserMenu />

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
