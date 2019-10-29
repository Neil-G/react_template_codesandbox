import React from "react";
import styled from 'styled-components'
import { connect } from 'react-redux'
import { GeneralInfoForm, EmailForm } from './../../forms/TextForms'
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
    return (
      <Container>
        <h5>Your Profile</h5>
        <FormContainer>
          <h3>General Info</h3>
          <GeneralInfoForm user={user} />
        </FormContainer>
        <FormContainer>
          <h3>Contact Info</h3>
          <EmailForm user={user} />
        </FormContainer>

      </Container>
    );
  }
}

/*
|--------------------------------------------------------------------------
| Redux
|--------------------------------------------------------------------------
*/

const mapStateToProps = ({ session: { user }}) => {
  return {
    user
  }
}

export default connect(mapStateToProps)(ProfilePage)