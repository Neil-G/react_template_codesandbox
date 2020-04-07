import React from 'react'
import styled from 'styled-components'
import Panel from './../shared/Panel'
import { get } from 'lodash'
import { TextInput, TextAreaInput } from './TextInputs'
import { FormContainer, InputContainer } from './StyledComponents'
import updater from './../../redux/updater'

/*
|--------------------------------------------------------------------------
| Styled Components
|--------------------------------------------------------------------------
*/

const updateItemField = (id, key, value) => {
  return updater.findItemByIdAndUpdate({
    id,
    updates: { [key]: value },
    successActions: [
      {
        type: 'items',
        updateFunction: ({ res }, state) => {
          const error = get(res, `data.errors[0]`)
          console.log('error', error)
          console.log('res', get(res, `data.errors[0]`))
          if (error) {
            if (
              error.message.includes('E11000') &&
              error.message.includes(key)
            ) {
              window.alert(`The ${key} ${value} is already taken`)
              return state
            }
          }
          const item = state[id] || {}
          const updates = res.data.data.findOneItemAndUpdate || {}
          const findItem = { ...item, ...updates }
          return { ...state, [id]: findItem }
        },
      },
    ],
  })
}

const SectionTitle = styled(Panel.SectionTitle)`
  margin-bottom: 30px;
`
/*
|--------------------------------------------------------------------------
| React
|--------------------------------------------------------------------------
*/

export default class EditItemForm extends React.Component {
  state = { data: {} }
  componentDidUpdate(prevProps) {
    const isItemLoadedFromStore =
      !get(this, 'state.data.id') && get(this, 'props.item.id')
    const itemLoadedFromDb =
      get(this, 'props.item.id') !== get(prevProps, 'item.id')
    if (isItemLoadedFromStore || itemLoadedFromDb) {
      this.setState({ data: this.props.item })
    }
  }
  render() {
    const { item } = this.props
    const { data } = this.state
    return (
      <>
        <Panel.Section>
          <SectionTitle>Details</SectionTitle>
          <FormContainer>
            <InputContainer half>
              <TextInput
                label='Title'
                value={get(data, 'title')}
                onChange={e =>
                  this.setState({ data: { ...data, title: e.target.value } })
                }
                handleSaveChange={() => {
                  updateItemField(item.id, 'title', data.title)
                }}
              />
            </InputContainer>
            <InputContainer>
              <TextAreaInput
                label='Description'
                value={get(data, 'description')}
                onChange={e =>
                  this.setState({
                    data: { ...data, description: e.target.value },
                  })
                }
                handleSaveChange={() => {
                  updateItemField(item.id, 'description', data.description)
                }}
              />
            </InputContainer>
          </FormContainer>
        </Panel.Section>
        <Panel.Section>
          <SectionTitle>State</SectionTitle>
          State options
        </Panel.Section>
      </>
    )
  }
}
