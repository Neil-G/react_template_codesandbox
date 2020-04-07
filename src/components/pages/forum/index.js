import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Page from './../../shared/Page'
import SelectInput from './../../forms/SelectInput'
import { forumPageConfig } from './../../../configs/pages'

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

class ForumPage extends React.Component {
  render() {
    const {
      history: { push },
      location: { pathname },
    } = this.props
    const subRoute = forumPageConfig.subRoutes.find(
      ({ path }) => pathname === path,
    )
    return (
      <Page.Container>
        <Page.ContentContainer>
          <Page.Title>{forumPageConfig.label}</Page.Title>
          <div style={{ maxWidth: '180px' }}>
            <SelectInput
              value={subRoute}
              onChange={selectedOption => push(selectedOption.value)}
              options={forumPageConfig.subRoutes.map(subRoute => {
                return { label: subRoute.label, value: subRoute.path }
              })}
            />
          </div>
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

export default withRouter(connect(mapStateToProps)(ForumPage))
