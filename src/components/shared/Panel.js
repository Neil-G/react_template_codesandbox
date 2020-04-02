import React from 'react'
import styled, { css } from 'styled-components'

export const PanelContainer = styled.div`
  background: white;
  // SELECTED styling
  // border: 1px solid #e3eaef;
  // border-radius: 3px;
  // box-shadow: 0px 3px 6px #0000000d;
  // JUMPSTART ME STYLING
  border: 1px solid rgb(214, 218, 224);
  border-radius: 5px;
  margin-bottom: 18px;
`

export const PanelSection = styled.div`
  padding: 18px;
  &:not(:last-child) {
    border-bottom: 1px solid rgb(214, 218, 224);
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

export const PanelSectionTitle = styled.h3`
  font-weight: 700;
  margin-top: 0px;
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
  SectionTitle: PanelSectionTitle,
  ColumnsContainer: PanelColumnsContainer,
  PageNavContainer: PanelPageNavContainer,
}
