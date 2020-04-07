import React, { useState } from 'react'
import styled from 'styled-components'
import TetherComponent from 'react-tether'
import { Link } from 'react-router-dom'
import { logout } from '../../../utils'
import { SettingsPath, PROFILE_PAGE_PATH } from '../../../constants/urlPaths'

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
  width: 200px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  position: relative;
  left: 60px;
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

export default () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <TetherComponent
      attachment='top right'
      constraints={[
        {
          to: 'scrollParent',
          attachment: 'together',
        },
      ]}
      /* renderTarget: This is what the item will be tethered to, make sure to attach the ref */
      renderTarget={ref => (
        <UserMenuButtonContainer ref={ref}>
          <i
            className='fal fa-user-circle user-menu-icon'
            style={{ marginRight: '8px', fontSize: '1.5em' }}
          />
          <i
            id='user-menu-toggle-icon'
            className='fas fa-caret-down user-menu-dropdown'
            style={{ cursor: 'pointer' }}
            onClick={() => setIsOpen(!isOpen)}
          />
        </UserMenuButtonContainer>
      )}
      /* renderElement: If present, this item will be tethered to the the component returned by renderTarget */
      renderElement={ref =>
        isOpen && (
          <UserMenuContainer ref={ref} onMouseLeave={() => setIsOpen(false)}>
            <Link to={PROFILE_PAGE_PATH} onClick={() => setIsOpen(false)}>
              <UserMenuItem>
                <i className='fal fa-id-card' />
                Your Profile
              </UserMenuItem>
            </Link>
            <Link to={SettingsPath} onClick={() => setIsOpen(false)}>
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
    />
  )
}
