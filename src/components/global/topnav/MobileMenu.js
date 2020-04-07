import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
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

export default ({ navItemConfigs }) => {
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
            return (
              <Link to={path} onClick={() => setIsOpen(false)}>
                <MobileNavItem>{label}</MobileNavItem>
              </Link>
            )
          })}
          <MobileNavItem onClick={logout}>Logout</MobileNavItem>
        </MobileMenuContainer>
      )}
    </MobileMenuButtonContainer>
  )
}
