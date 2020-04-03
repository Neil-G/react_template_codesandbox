import React from 'react'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { get, capitalize } from 'lodash'
import { SettingsPath, PROFILE_PAGE_PATH } from './../../constants/urlPaths.js'
import { globalLayout } from './../../styles'
import updater from './../../redux/updater'
import { logout } from './../../utils'
import {
  homePageConfig,
  searchPageConfig,
  managePageConfig,
  messagesPageConfig,
  forumPageConfig,
  profilePageConfig,
  itemsPageConfig,
} from './../../configs/pages'
import { light } from './../../styles/colors'
import TetherComponent from 'react-tether'
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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  position: relative;
  border-bottom: 4px solid white;

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
  ${({ isActive }) => {
    return (
      isActive &&
      css`
        border-bottom: 4px solid tomato;
        box-sizing: border-box;
      `
    )
  }}
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

class NavItemWithSubmenu extends React.Component {
  render() {
    const {
      label,
      path,
      subRoutes,
      isSubMenuOpen,
      openSubMenu,
      closeSubMenu,
      pathname,
    } = this.props
    return (
      <TetherComponent
        attachment='top center'
        constraints={[
          {
            to: 'scrollParent',
            attachment: 'together',
          },
        ]}
        /* renderTarget: This is what the item will be tethered to, make sure to attach the ref */
        renderTarget={ref => (
          <NavItem
            isActive={pathname.includes(path)}
            ref={ref}
            onMouseEnter={openSubMenu}
          >
            <Link to={path} onClick={closeSubMenu}>
              {label}
            </Link>
          </NavItem>
        )}
        /* renderElement: If present, this item will be tethered to the the component returned by renderTarget */
        renderElement={ref =>
          isSubMenuOpen && (
            <div
              onMouseLeave={closeSubMenu}
              ref={ref}
              style={{
                border: '1px solid rgba(0,0,0,0.15)',
                padding: '8px',
                background: 'white',
                width: '160px',
                borderRadius: '3px',
              }}
            >
              {subRoutes.map(subRoute => {
                return (
                  <div>
                    <Link
                      style={{
                        display: 'block',
                        padding: '12px',
                        textDecoration: 'none',
                        // borderBottom: '1px solid rgba(0,0,0,0.15)',
                        borderLeft:
                          pathname === subRoute.path && '2px solid tomato',
                      }}
                      onClick={closeSubMenu}
                      onMouseLeave={e => e.stopPropagation()}
                      to={subRoute.path}
                    >
                      {capitalize(subRoute.label)}
                    </Link>
                  </div>
                )
              })}
            </div>
          )
        }
      />
    )
  }
}

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
  searchPageConfig,
  itemsPageConfig,
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
  searchPageConfig,
  itemsPageConfig,
  managePageConfig,
  messagesPageConfig,
  forumPageConfig,
  profilePageConfig,
]

class TopNav extends React.Component {
  state = {
    isMobileMenuOpen: false,
    openNavSubitemMenu: undefined,
  }
  render() {
    const {
      isUserMenuOpen,
      user,
      location: { pathname },
    } = this.props
    const { isMobileMenuOpen, openNavSubitemMenu } = this.state

    return (
      <Container>
        {/* Logo */}
        <NavItem key='logo'>
          <Link to={homePageConfig.path}>
            <i className='fal fa-robot logo' />
          </Link>
        </NavItem>

        {/* Center Nav Options */}
        <DesktopNavItemContainer>
          {/*  NDesktop Nav Items */}
          {desktopNavItems.map(({ label, path, subRoutes }) => {
            if (subRoutes) {
              return (
                <NavItemWithSubmenu
                  label={label}
                  path={path}
                  subRoutes={subRoutes}
                  pathname={pathname}
                  isSubMenuOpen={openNavSubitemMenu === label}
                  openSubMenu={() =>
                    this.setState({ openNavSubitemMenu: label })
                  }
                  closeSubMenu={() =>
                    this.setState({ openNavSubitemMenu: undefined })
                  }
                />
              )
            } else {
              return (
                <NavItem
                  key={label}
                  isActive={pathname.includes(path)}
                  onMouseEnter={() =>
                    openNavSubitemMenu !== label &&
                    this.setState({ openNavSubitemMenu: undefined })
                  }
                >
                  <Link to={path}>{label}</Link>
                </NavItem>
              )
            }
          })}
        </DesktopNavItemContainer>

        {/* Desktop User Menu */}
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
              updater.toggleOpenGlobal({
                componentName: 'topNav',
              })
            }}
          />
          {isUserMenuOpen && <UserMenu user={user} />}
        </UserMenuButtonContainer>

        {/* Mobile hamburger menu button */}
        <MobileMenuButtonContainer>
          <i
            className={isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}
            style={{ cursor: 'pointer' }}
            onClick={() =>
              this.setState({ isMobileMenuOpen: !isMobileMenuOpen })
            }
          ></i>
          {isMobileMenuOpen && (
            <MobileMenu
              closeMobileMenu={() => this.setState({ isMobileMenuOpen: false })}
            />
          )}
        </MobileMenuButtonContainer>
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
