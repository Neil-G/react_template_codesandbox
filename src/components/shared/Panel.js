import React from 'react'
import styled, { css } from 'styled-components'

export const PanelContainer = styled.div`
  background: white;
  box-shadow: 0px 3px 6px #0000000d;
  border: 1px solid #e3eaef;
  border-radius: 4px;
`

export const PanelSection = styled.div`
  padding: 18px;
  &:not(:last-child) {
    border-bottom: 1px solid #e3eaef;
  }
  ${({ mobileOnly }) => {
    return (
      mobileOnly &&
      css`
        @media (max-width: 720px) {
          display: none;
        }
      `
    )
  }}
`

export const PanelColumnsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const PanelPageNavContainer = styled(PanelContainer)`
  margin-right: 18px;
  @media (max-width: 720px) {
    display: none;
  }
`

export default {
  Container: PanelContainer,
  Section: PanelSection,
  ColumnsContainer: PanelColumnsContainer,
  PageNavContainer: PanelPageNavContainer,
}
