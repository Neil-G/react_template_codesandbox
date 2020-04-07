import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Page from './../../shared/Page'
import Panel from './../../shared/Panel'
import EditItemForm from './../../forms/EditItemForm'
import updater from './../../../redux/updater'

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

class EditItemPage extends React.Component {
  componentDidMount() {
    const {
      match: {
        params: { itemId },
      },
    } = this.props
    updater.findItemById({
      id: itemId,
      returnFields: ['title', 'description'].join(' '),
      successActions: [
        {
          name: `load item ${itemId} into te store`,
          type: 'items',
          updateFunction: ({ res }, state) => {
            const currentItem = state[itemId] || {}
            const freshData = res.data.data.findItemById
            const refreshedItem = { ...currentItem, ...freshData }
            return { ...state, [itemId]: refreshedItem }
          },
        },
      ],
    })
  }

  render() {
    const {
      history: { push },
      location: { pathname },
      item,
    } = this.props
    return (
      <Page.Container>
        <Page.ContentContainer>
          <Page.Title>Edit Item</Page.Title>
          <Panel.Container>
            <EditItemForm item={item} />
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

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { itemId },
    },
  } = ownProps
  return {
    user: get(state.users, state.session.userId, {}),
    item: get(state.items, itemId),
  }
}

export default withRouter(connect(mapStateToProps)(EditItemPage))
