import React from 'react'
import styled from 'styled-components'
import { get, isEmpty } from 'lodash'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Page from './../../shared/Page'
import Panel from './../../shared/Panel'
import BrandButtons from './../../shared/BrandButtons'
import {
  ONBOARDING_PAGE_PATHS,
  HOME_PAGE_PATH,
} from './../../../constants/urlPaths'

/*
|--------------------------------------------------------------------------
| Styled Components
|--------------------------------------------------------------------------
*/

const SkipText = styled.div`
  color: #757575;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    color: #616161;
    text-decoration: underline;
  }
`

const onboardingSubpagesConfig = [
  {
    pageHeading: 'This is the topic of this set of questions',
    pageSubheading: 'Please tell us about yourself',
    path: ONBOARDING_PAGE_PATHS.FIRST,
    canSkip: true,
    getErrors: () => [],
    Component: () => <Panel.Section>HELLO</Panel.Section>,
  },
  {
    pageHeading: 'We want a little bit more about you',
    pageSubheading: 'Some more questions',
    path: ONBOARDING_PAGE_PATHS.SECOND,
    getErrors: () => [],
    Component: () => <Panel.Section>HI</Panel.Section>,
  },
  {
    pageHeading: 'Terms & Conditions',
    pageSubheading: "We'd like you to agree",
    path: ONBOARDING_PAGE_PATHS.TERMS,
    getErrors: () => [],
    Component: () => (
      <Panel.Section style={{ lineHeight: '1.5em' }}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Panel.Section>
    ),
  },
]

/*
|--------------------------------------------------------------------------
| React
|--------------------------------------------------------------------------
*/

class OnboardingPage extends React.Component {
  render() {
    const {
      history: { push },
    } = this.props
    return (
      <Page.Container>
        {onboardingSubpagesConfig.map(
          (
            {
              pageHeading,
              pageSubheading,
              path,
              Component,
              canSkip,
              getErrors,
            },
            idx,
          ) => {
            const isLastStep = idx === onboardingSubpagesConfig.length - 1
            const errors = getErrors()
            const canContinue = isEmpty(errors)
            const backUrl = idx !== 0 && onboardingSubpagesConfig[idx - 1].path
            const nextUrl =
              !isLastStep && onboardingSubpagesConfig[idx + 1].path
            return (
              <Route
                key={path}
                exact
                path={path}
                render={() => {
                  return (
                    <Page.ContentContainer maxWidth='960'>
                      <Page.Title className='spaced'>
                        <div>{pageHeading}</div>
                        {canSkip && nextUrl && (
                          <SkipText onClick={() => push(nextUrl)}>
                            Skip
                            <i
                              className='fas fa-chevron-right'
                              style={{ marginLeft: '4px' }}
                            />
                          </SkipText>
                        )}
                      </Page.Title>
                      <p>{pageSubheading}</p>
                      <Panel.Container>
                        <Component />
                      </Panel.Container>
                      <div>
                        {backUrl && (
                          <BrandButtons.White
                            style={{ float: 'left' }}
                            onClick={() => push(backUrl)}
                          >
                            Back
                          </BrandButtons.White>
                        )}

                        <BrandButtons.Primary
                          disabled={!canContinue}
                          style={{ float: 'right' }}
                          onClick={() => {
                            if (!canContinue) return
                            if (!isLastStep) {
                              push(nextUrl)
                            } else {
                              push(HOME_PAGE_PATH)
                            }
                          }}
                        >
                          {!isLastStep ? 'Continue' : 'Finish!'}
                        </BrandButtons.Primary>
                      </div>
                    </Page.ContentContainer>
                  )
                }}
              />
            )
          },
        )}
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

export default withRouter(connect(mapStateToProps)(OnboardingPage))
