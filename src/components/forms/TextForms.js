import React, { Component } from 'react'
import { TextInput } from './TextInputs'

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

export class GeneralInfoForm extends Component {
    state = {
        firstName: undefined,
        lastName: undefined,
        userName: undefined,
    }

    componentDidMount() {
        
    }
    render() {
        const { firstName, lastName, userName } = this.state
        return(
            <div>
                <TextInput 
                    label='Username'
                    placeholder='your username...'
                    value={userName || ''}
                    onChange={e => this.setState({ userName: e.target.value })}
                />
                <TextInput 
                    label='First Name'
                    placeholder='your first name...'
                    value={firstName || ''}
                    onChange={e => this.setState({ userName: e.target.value })}
                />
                <TextInput 
                    label='Last Name'
                    placeholder='your last name...'
                    value={lastName || ''}
                    onChange={e => this.setState({ lastName: e.target.value })}
                />
                <button>update</button>
            </div>
        )
    }
}

/*
|--------------------------------------------------------------------------
| Email Form
|--------------------------------------------------------------------------
*/

export class EmailForm extends Component {
    state = {
        emailAddress: undefined
    }

    componentDidMount() {
        const { user: { emailAddress }} = this.props
        this.setState({ emailAddress })
    }

    render() {
        const { emailAddress } = this.state
        return(
            <div>
                <TextInput 
                    label='Email'
                    placeholder='your email address...'
                    value={emailAddress || ''}
                    onChange={e => this.setState({ emailAddress: e.target.value })}
                />
                <button>Update</button>
            </div>
        )
    }
} 