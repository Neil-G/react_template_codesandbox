import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import { connect } from 'react-redux'
import Page from './../../shared/Page'
import FilterBar from './../../shared/FilterBar'
import { searchPageConfig } from './../../../configs/pages'

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
        <FilterBar />
        <Page.ContentContainer>
          <Page.Title>Search</Page.Title>
          <Page.Nav
            rootPath={searchPageConfig.path}
            navItems={[
              { label: 'new', count: 10 },
              { label: 'read', count: 25 },
              { label: 'saved', count: 15 },
              { label: 'all', count: 5 },
            ]}
          />
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
