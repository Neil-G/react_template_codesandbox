import React from 'react'
import TetherComponent from 'react-tether'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { noop, startCase, capitalize } from 'lodash'

/*
|--------------------------------------------------------------------------
| Styled Components
|--------------------------------------------------------------------------
*/

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

const SubNavLinkItemsContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 18px;
  background: white;
  width: 160px;
  border-radius: 3px;
`

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
| Top Nav Item
|--------------------------------------------------------------------------
*/

export default ({
  label,
  subRoutes,
  history,
  path,
  openSubmenuName,
  setOpenSubmenuName = noop,
}) => {
  const {
    push,
    location: { pathname },
  } = history
  if (subRoutes) {
    // Render Nav Item with subroutes menu
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
            onClick={() => (push(path), setOpenSubmenuName(undefined))}
            isActive={pathname.includes(path)}
            ref={ref}
            onMouseLeave={() => setOpenSubmenuName(undefined)}
            onMouseEnter={() => setOpenSubmenuName(label)}
          >
            {label}
          </NavItem>
        )}
        /* renderElement: If present, this item will be tethered to the the component returned by renderTarget */
        renderElement={ref =>
          openSubmenuName === label && (
            <SubNavLinkItemsContainer
              onMouseLeave={() => setOpenSubmenuName(undefined)}
              ref={ref}
            >
              {subRoutes.map(subRoute => {
                return (
                  <SubNavLinkItem
                    isActive={pathname === subRoute.path}
                    onClick={() => setOpenSubmenuName(undefined)}
                    onMouseLeave={e => e.stopPropagation()}
                    to={subRoute.path}
                  >
                    {startCase(capitalize(subRoute.label))}
                  </SubNavLinkItem>
                )
              })}
            </SubNavLinkItemsContainer>
          )
        }
      />
    )
  } else {
    // Render Nav Item Only
    return (
      <NavItem
        key={label}
        isActive={pathname.includes(path)}
        onClick={() => push(path)}
        onMouseEnter={() =>
          openSubmenuName !== label && setOpenSubmenuName(undefined)
        }
      >
        {label}
      </NavItem>
    )
  }
}
