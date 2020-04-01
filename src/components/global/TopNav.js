import React from 'react'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { get, noop } from 'lodash'
import { SettingsPath, PROFILE_PAGE_PATH } from './../../constants/urlPaths.js'
import { globalLayout } from './../../styles'
import updater from './../../redux/updater'
import { logout } from './../../utils'
import {
  homePageConfig,
  searchPageConfig,
  managePageConfig,
  profilePageConfig,
} from './../../configs/pages'
const withClickOutside = require('react-click-outside')

/*
|--------------------------------------------------------------------------
| Styled Components
|--------------------------------------------------------------------------
*/

const Container = styled.div`
  background: white;
  position: fixed;
  top: 0;
  width: 100%;
  height: ${globalLayout.topNavHeightPx};
  display: flex;
  justify-content: space-between;
  background: #ede7f6;
  z-index: 1000;
`

const SectionContainer = styled.div`
  display: flex;
`

const SectionContainerLeft = styled(SectionContainer)``

const SectionContainerRight = styled(SectionContainer)``

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
  ${({ hideOnMobile }) => {
    return (
      hideOnMobile &&
      `
      @media (max-width: 540px) {
        display: none;
      }
    `
    )
  }}
  ${({ hideOnDesktop }) => {
    return (
      hideOnDesktop &&
      `
      @media (min-width: 540px) {
        display: none;
      }
    `
    )
  }}
`

/*
|--------------------------------------------------------------------------
| User Menu Component
|--------------------------------------------------------------------------
*/

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
| Mobile Menu
|--------------------------------------------------------------------------
*/

const MobileMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  position: fixed;
  top: ${globalLayout.topNavHeightPx};
  right: 0px;
  bottom: 0px;
  left: 0px;
  a {
    color: #333;
    text-decoration: none;
  }
`

const MobileMenuItem = styled.div`
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

const mobileMenuItems = []

const MobileMenu = ({ closeMobileMenu }) => {
  return (
    <MobileMenuContainer>
      {mobileMenuItems.map(({ label, to = '/' }) => {
        return (
          <Link to={to} onClick={closeMobileMenu}>
            <MobileMenuItem>{label}</MobileMenuItem>
          </Link>
        )
      })}
      <MobileMenuItem onClick={logout}>Logout</MobileMenuItem>
    </MobileMenuContainer>
  )
}

/*
|--------------------------------------------------------------------------
| Nav Items
|--------------------------------------------------------------------------
*/

const desktopNavItems = [
  homePageConfig,
  searchPageConfig,
  managePageConfig,
  profilePageConfig,
]
/*
|--------------------------------------------------------------------------
| TopNav Component
|--------------------------------------------------------------------------
*/

class TopNav extends React.Component {
  state = {
    isMobileMenuOpen: false,
  }
  render() {
    const { isUserMenuOpen, user } = this.props
    const { isMobileMenuOpen } = this.state
    return (
      <Container>
        {/* Left Section */}
        <SectionContainerLeft>
          <TopNavItem key='logo'>
            <Link to={'/'}>
              <i className='fal fa-robot logo' />
            </Link>
          </TopNavItem>
          {desktopNavItems.map(({ label, path }) => {
            return (
              <TopNavItem key={label}>
                <Link to={path}>{label}</Link>
              </TopNavItem>
            )
          })}
        </SectionContainerLeft>

        {/* Right Section */}
        <SectionContainerRight>
          <TopNavItem hideOnMobile>
            <i className='fal fa-user-circle user-menu-icon' />
            <i
              id='user-menu-toggle-icon'
              className='fas fa-caret-down user-menu-dropdown'
              onClick={() => {
                updater.toggleOpenGlobal({
                  componentName: 'topNav',
                })
              }}
            />
            {isUserMenuOpen && <UserMenu user={user} />}
          </TopNavItem>
          <TopNavItem hideOnDesktop>
            <i
              className={isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}
              onClick={() =>
                this.setState({ isMobileMenuOpen: !isMobileMenuOpen })
              }
            ></i>
            {isMobileMenuOpen && (
              <MobileMenu
                closeMobileMenu={() =>
                  this.setState({ isMobileMenuOpen: false })
                }
              />
            )}
          </TopNavItem>
        </SectionContainerRight>
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
    isUserMenuOpen: state.global.isOpen.topNav,
  }
}

export default withRouter(connect(mapStateToProps)(TopNav))
