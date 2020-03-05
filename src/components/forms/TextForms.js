import React, { Component } from 'react'
import { TextInput } from './TextInputs'
import updater from './../../redux/updater'
import { get, pick, isEqual } from 'lodash'
import { FormContainer, InputContainer } from './StyledComponents'

/*
|--------------------------------------------------------------------------
| Shared Styled Components
|--------------------------------------------------------------------------
*/


const updateUserField = (userId, key, value) => {
    return updater.findUserByIdAndUpdate({
        userId,
        updates: { [key]: value },
        successActions: [
            {
                type: 'users',
                updateFunction: ({ res }, state) => {
                    const error = get(res, `data.errors[0]`)
                    console.log('error', error)
                    console.log('res', get(res, `data.errors.[0]`))
                    if (error){
                        if (error.message.includes('E11000') && error.message.includes(key)) {
                            window.alert(`The ${key} ${value} is already taken`)
                            return state
                        }
                    }
                    const user = state[userId] || {}
                    const updates = res.data.data.findOneUserAndUpdate || {}
                    const updatedUser = { ...user, ...updates }
                    return { ...state, [userId]: updatedUser }
                }
            }
        ]
    })
}

/*
|--------------------------------------------------------------------------
| General Info Form
|--------------------------------------------------------------------------
*/

const userFields = ['firstName', 'lastName', 'emailAddress', 'userName']

export class UserInfoForm extends Component {
    state = {}

    _syncPropsAndState = () => {
        const { user } = this.props
        this.setState(pick(user, userFields))
    }

    componentDidMount() {
        this._syncPropsAndState()
    }

    componentDidUpdate(prevProps) {
        const prevUser = pick(prevProps.user, userFields)
        const currUser = pick(this.props.user, userFields)
        const hasUserBeenUpdated = !isEqual(prevUser, currUser)
        if (hasUserBeenUpdated) {
            this._syncPropsAndState()
        }
    }

    render() {
        const { user } = this.props
        const { firstName, lastName, emailAddress, userName } = this.state
        return(
            <FormContainer>
                <InputContainer half>
                    <TextInput 
                        label='First Name'
                        placeholder='your first name...'
                        value={firstName || ''}
                        onChange={e => this.setState({ firstName: e.target.value })}
                        lastSavedValue={user.firstName}
                        handleSaveChange={() => {
                            updateUserField(user.id, 'firstName', firstName)
                        }}
                    />
                </InputContainer>
                <InputContainer half>
                    <TextInput 
                        label='Last Name'
                        placeholder='your last name...'
                        value={lastName || ''}
                        onChange={e => this.setState({ lastName: e.target.value })}
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput 
                        label={<div>Email <span>(Click here to verify)</span></div>}
                        placeholder='your email address...'
                        value={emailAddress || ''}
                        onChange={e => this.setState({ emailAddress: e.target.value })}
                        lastSavedValue={user.emailAddress}
                        handleSaveChange={() => {
                            updateUserField(user.id, 'emailAddress', emailAddress)
                        }}
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput 
                        label='Username'
                        placeholder='your username...'
                        value={userName || ''}
                        onChange={e => this.setState({ userName: e.target.value })}
                    />
                </InputContainer>
                
            </FormContainer>
        )
    }
}
