import React from "react";
import styled from 'styled-components'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { UserInfoForm } from './../../forms/TextForms'
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
    const { isFacebookAccountConnected, isGoogleAccountConnected } = user
    return (
      <Container>
        <h5>Your Profile</h5>
        <FormContainer>
          <h3>General Info</h3>
          <UserInfoForm user={user} />
        </FormContainer>
        <div>{isFacebookAccountConnected && 'Facebook account is connected'}</div>
        <div>{isGoogleAccountConnected && 'Google account is connected'}</div>
        <div></div>
      </Container>
    );
  }
}

/*
|--------------------------------------------------------------------------
| Redux
|--------------------------------------------------------------------------
*/

const mapStateToProps = state => {
  return {
    user: get(state.users, state.session.userId, {})
  }
}

export default connect(mapStateToProps)(ProfilePage)