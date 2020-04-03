import React from 'react'
import styled from 'styled-components'
import { get, capitalize, startCase } from 'lodash'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Route } from 'react-router-dom'
import { UserInfoForm } from './../../forms/TextForms'
import Panel from './../../shared/Panel'
import Page from './../../shared/Page'
import { profilePageConfig } from './../../../configs/pages'
import { PROFILE_PAGE_SUBPATHS } from './../../../constants/urlPaths'

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

class ProfilePage extends React.Component {
  render() {
    const {
      history: { push },
      location: { pathname },
      user,
    } = this.props
    const {
      isFacebookAccountConnected,
      isGoogleAccountConnected,
      isGithubAccountConnected,
    } = user
    return (
      <Page.Container>
        <Page.ContentContainer>
          <Page.Title>{profilePageConfig.label}</Page.Title>
          <Panel.ColumnsContainer>
            {/* Nav Panel */}
            <Panel.PageNavContainer>
              {profilePageConfig.subRoutes.map(({ label, path }) => {
                return (
                  <Panel.PageNavItem
                    isActive={pathname === path}
                    onClick={() => push(path)}
                    style={{ cursor: 'pointer' }}
                  >
                    {startCase(capitalize(label))}
                  </Panel.PageNavItem>
                )
              })}
            </Panel.PageNavContainer>
            <div style={{ flexGrow: 1 }}>
              {/* User Info */}
              <Route
                key={PROFILE_PAGE_SUBPATHS.USER_INFO}
                exact
                path={[
                  profilePageConfig.path,
                  PROFILE_PAGE_SUBPATHS.USER_INFO,
                ].join('/')}
                render={() => {
                  return (
                    <Panel.Container>
                      <Panel.Section>
                        <Panel.SectionTitle>General Info</Panel.SectionTitle>
                        <UserInfoForm user={user} />
                      </Panel.Section>
                    </Panel.Container>
                  )
                }}
              />

              <Route
                key={PROFILE_PAGE_SUBPATHS.LINKED_ACCOUNTS}
                exact
                path={[
                  profilePageConfig.path,
                  PROFILE_PAGE_SUBPATHS.LINKED_ACCOUNTS,
                ].join('/')}
                render={() => {
                  return (
                    <Panel.Container>
                      {/* Social Platform Accounts */}
                      <Panel.Section>
                        <Panel.SectionTitle>
                          Social Media Accounts
                        </Panel.SectionTitle>
                        <div>
                          {isFacebookAccountConnected &&
                            'Facebook account is connected'}
                        </div>
                        <div>
                          {isGoogleAccountConnected &&
                            'Google account is connected'}
                        </div>
                        <div>
                          {isGithubAccountConnected &&
                            'Github account is connected'}
                        </div>
                      </Panel.Section>
                    </Panel.Container>
                  )
                }}
              />
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

export default withRouter(connect(mapStateToProps)(ProfilePage))
