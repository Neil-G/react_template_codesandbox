import React from 'react'
import styled, { css } from 'styled-components'
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
        padding-left: ${SEARCH_BAR_DESKTOP_WIDTH + 12}px;
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

export const PageTitle = styled.h1``

/*
|--------------------------------------------------------------------------
| Content Container
|--------------------------------------------------------------------------
*/

export const PageContentContainer = styled.div`
  margin: auto;
  max-width: 1200px;
  padding: 12px;
`

/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
*/

export default {
  Container: PageContainer,
  ContentContainer: PageContentContainer,
  Title: PageTitle,
}
