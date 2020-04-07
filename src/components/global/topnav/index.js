import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import { globalLayout } from '../../../styles'
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
import { NavItem } from './NavItemWithSubmenu'
import NavItemWithSubmenu from './NavItemWithSubmenu'
import UserMenu from './UserMenu'
import MobileMenu from './MobileMenu'

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

/*
|--------------------------------------------------------------------------
| Mobile Menu
|--------------------------------------------------------------------------
*/

const mobileMenuItems = [
  homePageConfig,
  itemsPageConfig,
  searchPageConfig,
  managePageConfig,
  messagesPageConfig,
  forumPageConfig,
  profilePageConfig,
]

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
        {/*  Desktop Nav Items */}
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
        <MobileMenu navItemConfigs={mobileMenuItems} />
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
