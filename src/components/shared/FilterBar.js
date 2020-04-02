import React from 'react'
import styled from 'styled-components'
import Modal from './Modal'
import {
  TOP_NAV_HEIGHT,
  SEARCH_BAR_DESKTOP_WIDTH,
} from './../../styles/globalLayout'
import Panel from './Panel'
import { light } from './../../styles/colors'

const DesktopContainer = styled.div`
  border-right: 1px solid ${light};
  background: white;
  position: fixed;
  top: ${TOP_NAV_HEIGHT}px;
  left: 0;
  bottom: 0;
  overflow-y: scroll;
  width: ${SEARCH_BAR_DESKTOP_WIDTH}px;
  @media (max-width: 720px) {
    display: none;
  }
`

/*
|--------------------------------------------------------------------------
| Top Level Container
|--------------------------------------------------------------------------
*/

export class Filter extends React.Component {
  render() {
    return (
      <div>
        <Panel.Section>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>Filters</div>
            <div>Reset all</div>
          </div>
        </Panel.Section>
      </div>
    )
  }
}

export class DesktopFilterBar extends React.Component {
  render() {
    return (
      <DesktopContainer>
        <Filter />
      </DesktopContainer>
    )
  }
}

export const MobileFilterBar = ({ title = '', isOpen = false, closeModal }) => {
  return (
    <Modal isOpen={isOpen} title={title} closeModal={closeModal}>
      <Filter />
    </Modal>
  )
}

export default {
  Desktop: DesktopFilterBar,
  Mobile: MobileFilterBar,
}
