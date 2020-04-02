import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { UserInfoForm } from './../../forms/TextForms'
import Panel from './../../shared/Panel'
import Page from './../../shared/Page'

/*
|--------------------------------------------------------------------------
| Styled Components
|--------------------------------------------------------------------------
*/

const Container = styled.div`
  margin: auto;
  max-width: 600px;
  padding: 0 10px;
`

const FormContainer = styled.div`
  margin-bottom: 36px;
`

/*
|--------------------------------------------------------------------------
| React
|--------------------------------------------------------------------------
*/

class ProfilePage extends React.Component {
  render() {
    const { user } = this.props
    const {
      isFacebookAccountConnected,
      isGoogleAccountConnected,
      isGithubAccountConnected,
    } = user
    return (
      <Page.Container>
        <Page.ContentContainer maxWidth='720'>
          <Page.Title>Your Profile</Page.Title>
          <Panel.Container>
            <Panel.Section>
              <h3>General Info</h3>
            </Panel.Section>
            <Panel.Section>
              <UserInfoForm user={user} />
            </Panel.Section>
            <Panel.Section>
              <div>
                {isFacebookAccountConnected && 'Facebook account is connected'}
              </div>
              <div>
                {isGoogleAccountConnected && 'Google account is connected'}
              </div>
              <div>
                {isGithubAccountConnected && 'Github account is connected'}
              </div>
            </Panel.Section>
          </Panel.Container>
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

export default connect(mapStateToProps)(ProfilePage)
