import React, { Component } from 'react'
import { TextInput } from './TextInputs'
import updater from './../../redux/updater'
import {pick} from 'lodash'
import { FormContainer, InputContainer } from './StyledComponents'

/*
|--------------------------------------------------------------------------
| Shared Styled Components
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| General Info Form
|--------------------------------------------------------------------------
*/

export class UserInfoForm extends Component {
    state = {
        firstName: undefined,
        lastName: undefined,
        shouldSyncPropsAndState: false,
        isUpdateInProgress: false,
    }

    _syncPropsAndState = () => {
        const { user } = this.props
        this.setState(pick(user, ['firstName', 'lastName', 'emailAddress', 'userName']))
    }

    componentDidMount() {
        this._syncPropsAndState()
    }

    render() {
        const { firstName, lastName, emailAddress, userName } = this.state
        return(
            <FormContainer>
                <InputContainer half>
                <TextInput 
                    label='First Name'
                    placeholder='your first name...'
                    value={firstName || ''}
                    onChange={e => this.setState({ firstName: e.target.value })}
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
                <InputContainer><TextInput 
                    label={<div>Email <span>(Click here to verify)</span></div>}
                    placeholder='your email address...'
                    value={emailAddress || ''}
                    onChange={e => this.setState({ emailAddress: e.target.value })}
                /></InputContainer>
                <InputContainer><TextInput 
                    label='Username'
                    placeholder='your username...'
                    value={userName || ''}
                    onChange={e => this.setState({ userName: e.target.value })}
                /></InputContainer>
                
            </FormContainer>
        )
    }
}
