import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { UserInfoForm } from './../../forms/TextForms'
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

class ProfilePage extends React.Component {
  render() {
    return (
      <Container>
        <h5>Home</h5>
      </Container>
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