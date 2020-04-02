import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import { connect } from 'react-redux'
import Page from './../../shared/Page'
/*
|--------------------------------------------------------------------------
| Styled Components
|--------------------------------------------------------------------------
*/

const Container = styled.div``

/*
|--------------------------------------------------------------------------
| React
|--------------------------------------------------------------------------
*/

class SearchPage extends React.Component {
  render() {
    return (
      <Page.Container withSearchPanel>
        <Page.ContentContainer>
          <Page.Title>Search</Page.Title>
        </Page.ContentContainer>
      </Page.Container>
    )
  }
}

/*
|--------------------------------------------------------------------------
| Redux
|--------------------------------------------------------------------------
*/

const mapStateToProps = state => {
  return {
    user: get(state.users, state.session.userId, {}),
  }
}

export default connect(mapStateToProps)(SearchPage)
