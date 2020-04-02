import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { messagesPageConfig } from './../../../configs/pages'

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

class MessagesPage extends React.Component {
  render() {
    return (
      <Page.Container>
        <Page.ContentContainer>
          <Page.Title>Messages</Page.Title>
          <Page.Nav
            rootPath={messagesPageConfig.path}
            navItems={[
              { label: 'new', count: 10, icon: 'fal fa-inbox' },
              { label: 'read', count: 25, icon: 'fal fa-check' },
              { label: 'saved', count: 15, icon: 'fal fa-bookmark' },
              { label: 'archived', count: 15, icon: 'fal fa-archive' },
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

export default connect(mapStateToProps)(MessagesPage)
