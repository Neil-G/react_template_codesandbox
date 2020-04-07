import React, { useState } from 'react'
import styled from 'styled-components'
import { logout } from '../../../utils'
import { light } from '../../../styles/colors'

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
  top: 45px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  a {
    color: #333;
    text-decoration: none;
  }
`

const MobileNavItem = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-left: 6px solid ${({ isActive }) => (isActive ? 'tomato' : 'white')};
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 540px) {
    display: none;
  }
`

export default ({
  navItemConfigs,
  history: {
    push,
    location: { pathname },
  },
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <MobileMenuButtonContainer>
      <i
        className={isOpen ? 'fas fa-times' : 'fas fa-bars'}
        style={{ cursor: 'pointer' }}
        onClick={() => setIsOpen(!isOpen)}
      ></i>
      {isOpen && (
        <MobileMenuContainer>
          {navItemConfigs.map(({ path, label }) => {
            const isActive = pathname.includes(path)
            return (
              <MobileNavItem
                isActive={isActive}
                onClick={() => (push(path), setIsOpen(false))}
              >
                {label}
              </MobileNavItem>
            )
          })}
          <MobileNavItem onClick={logout}>Logout</MobileNavItem>
        </MobileMenuContainer>
      )}
    </MobileMenuButtonContainer>
  )
}
