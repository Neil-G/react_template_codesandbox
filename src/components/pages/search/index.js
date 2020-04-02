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

const OpenMobileFilterButton = styled.button`
  float: right;
  @media (min-width: 720px) {
    display: none;
  }
`

/*
|--------------------------------------------------------------------------
| React
|--------------------------------------------------------------------------
*/

class SearchPage extends React.Component {
  state = {
    isMobileFilterOpen: false,
  }
  render() {
    const { isMobileFilterOpen } = this.state
    return (
      <Page.Container withSearchPanel>
        <FilterBar.Desktop />
        <FilterBar.Mobile
          isOpen={isMobileFilterOpen}
          title='Filter'
          closeModal={() => this.setState({ isMobileFilterOpen: false })}
        />
        <Page.ContentContainer>
          <Page.Title>
            Search
            <OpenMobileFilterButton
              onClick={() => this.setState({ isMobileFilterOpen: true })}
            >
              Filter
            </OpenMobileFilterButton>
          </Page.Title>
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
