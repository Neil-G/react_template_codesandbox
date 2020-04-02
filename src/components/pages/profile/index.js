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
        <Page.ContentContainer>
          <Page.Title>Your Profile</Page.Title>
          <Panel.ColumnsContainer>
            <Panel.PageNavContainer
              style={{ width: '270px', height: 'fit-content' }}
            >
              <Panel.Section>User Info</Panel.Section>
            </Panel.PageNavContainer>
            {/* User Info */}
            <div style={{ flexGrow: 1 }}>
              <Panel.Container>
                <Panel.Section>
                  <Panel.SectionTitle>General Info</Panel.SectionTitle>
                  <UserInfoForm user={user} />
                </Panel.Section>
              </Panel.Container>

              {/* Social Platform Accounts */}
              <Panel.Container>
                <Panel.Section>
                  <Panel.SectionTitle>Social Media Accounts</Panel.SectionTitle>
                  <div>
                    {isFacebookAccountConnected &&
                      'Facebook account is connected'}
                  </div>
                  <div>
                    {isGoogleAccountConnected && 'Google account is connected'}
                  </div>
                  <div>
                    {isGithubAccountConnected && 'Github account is connected'}
                  </div>
                </Panel.Section>
              </Panel.Container>
            </div>
          </Panel.ColumnsContainer>
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
