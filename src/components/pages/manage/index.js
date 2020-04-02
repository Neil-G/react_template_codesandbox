import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import { connect } from 'react-redux'
import SelectInput from './../../forms/SelectInput'
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

class ManagePage extends React.Component {
  render() {
    return (
      <Page.Container>
        <Page.ContentContainer>
          <Page.Title>Manage</Page.Title>
          <div style={{ maxWidth: '180px' }}>
            <SelectInput
              options={[
                { label: 'Needs Review', value: 'review' },
                { label: 'In Contact', value: 'contact' },
                { label: 'References ', value: 'reference' },
                { label: 'Sale ', value: 'sale' },
              ]}
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

export default connect(mapStateToProps)(ManagePage)
