import React from 'react'
import styled, { css } from 'styled-components'
import {
  TOP_NAV_HEIGHT,
  SEARCH_BAR_DESKTOP_WIDTH,
} from './../../styles/globalLayout'
import { light } from './../../styles/colors'

const Container = styled.div`
  border-right: 1px solid ${light};
  background: white;
  position: fixed;
  top: ${TOP_NAV_HEIGHT}px;
  left: 0;
  bottom: 0;
  overflow-y: scroll;
  width: ${SEARCH_BAR_DESKTOP_WIDTH}px;
`

/*
|--------------------------------------------------------------------------
| Top Level Container
|--------------------------------------------------------------------------
*/

export default class FilterBar extends React.Component {
  render() {
    return (
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>Filters</div>
          <div>Reset all</div>
        </div>
      </Container>
    )
  }
}
