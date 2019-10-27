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

        <h2>General Info</h2>
        <GeneralInfoForm user={user} />

        <h2>Contact Info</h2>
        <EmailForm user={user} />
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