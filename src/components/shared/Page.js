import React from 'react'
import styled, { css } from 'styled-components'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { capitalize } from 'lodash'
import { SEARCH_BAR_DESKTOP_WIDTH } from './../../styles/globalLayout'

/*
|--------------------------------------------------------------------------
| Top Level Container
|--------------------------------------------------------------------------
*/

export const PageContainer = styled.div`
  ${({ withSearchPanel }) => {
    return (
      withSearchPanel &&
      css`
        padding-left: ${SEARCH_BAR_DESKTOP_WIDTH}px;
        @media (max-width: 720px) {
          padding-left: 0px;
        }
      `
    )
  }}
`

/*
|--------------------------------------------------------------------------
| Main Header
|--------------------------------------------------------------------------
*/

export const PageTitle = styled.h1`
  margin-top: 0px;
  font-size: 24px;
`

/*
|--------------------------------------------------------------------------
| Content Container
|--------------------------------------------------------------------------
*/

export const PageContentContainer = styled.div`
  margin: auto;
  max-width: ${({ maxWidth }) => (maxWidth || '1200') + 'px'};
  padding: 18px;
`

/*
|--------------------------------------------------------------------------
| Page Navigation
|--------------------------------------------------------------------------
*/

const PageNavContainer = styled.div`
  box-shadow: 0px 1px 0px #e3eaef;
  box-sizing: border-box;
  margin: 27px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 720px) {
    margin: 16px 0;
    flex-direction: column;
    align-items: baseline;
    box-shadow: none;
  }
`
const NavItemsContainer = styled.div`
  display: flex;
`

const SectionContainer = styled.div`
  display: flex;
  @media (max-width: 720px) {
    width: 100%;
    margin-bottom: 12px;
  }
`

const PageNavItemContainer = styled(SectionContainer)`
  display: flex;
  align-items: center;
  color: #333;
  padding: 2px 10px 12px;
  margin-right: 14px;
  box-sizing: border-box;
  cursor: ${({ isActive }) => isActive && 'default !important'};
  border-bottom: ${({ isActive }) => isActive && '4px solid #2E595C'};
  font-size: 12px;
  @media (max-width: 540px) {
    font-size: 11px;
    margin-right: 0;
  }
  > a {
    text-decoration: none !important;
  }
`

const TotalCount = styled.div`
  background: ${({ isActive }) => (isActive ? '#2E595C' : '#8493A7')};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 100px;
  margin-left: 8px;
  padding: 3px 7px;
  font-size: 0.85em;
  @media (max-width: 540px) {
    margin-left: 3px;
  }
`

const PageNavItem = ({ label, isActive, to, count }) => {
  return (
    <Link
      to={to}
      onClick={() => window.scrollTo(0, 0)}
      style={{ textDecoration: 'none' }}
    >
      <PageNavItemContainer isActive={isActive}>
        {typeof label === 'string' ? capitalize(label) : label}{' '}
        {Number.isInteger(count) && (
          <TotalCount isActive={isActive}>{count}</TotalCount>
        )}
      </PageNavItemContainer>
    </Link>
  )
}

export const PageNav = withRouter(
  ({
    location: { pathname },
    navItems = [],
    renderFilterOptions,
    counts = {},
  }) => {
    return (
      <PageNavContainer>
        <NavItemsContainer>
          {navItems.map(({ label, path, icon }) => {
            return (
              <PageNavItem
                key={label}
                label={
                  window.innerWidth < 540 && icon ? (
                    <i
                      className={icon}
                      style={{ marginRight: '8px', fontSize: '1.5em' }}
                    />
                  ) : (
                    label
                  )
                }
                count={counts[label]}
                to={path}
                isActive={pathname === path}
              />
            )
          })}
        </NavItemsContainer>
        <SectionContainer>
          {renderFilterOptions && renderFilterOptions()}
        </SectionContainer>
      </PageNavContainer>
    )
  },
)

/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
*/

export default {
  Container: PageContainer,
  ContentContainer: PageContentContainer,
  Title: PageTitle,
  Nav: PageNav,
}
