import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import { connect } from 'react-redux'
import Page from './../../shared/Page'
import { itemsPageConfig } from './../../../configs/pages'
import BrandButtons from './../../shared/BrandButtons'
import BrandIcons from './../../shared/BrandIcons'
/*
|--------------------------------------------------------------------------
| Styled Components
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| React
|--------------------------------------------------------------------------
*/

class ItemsPage extends React.Component {
  render() {
    return (
      <Page.Container>
        <Page.ContentContainer>
          <Page.Title
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            Items
            <BrandButtons.Primary>
              <BrandIcons.Add marginRight />
              Add an Item
            </BrandButtons.Primary>
          </Page.Title>
          <Page.Nav navItems={itemsPageConfig.subRoutes} />
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

export default connect(mapStateToProps)(ItemsPage)
