import React, { Component } from 'react'
import { TextInput } from './TextInputs'
import updater from './../../redux/updater'

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
        shouldSyncPropsAndState: false,
        isUpdateInProgress: false,
    }

    _syncPropsAndState = () => {
        const { user: { firstName, lastName, }} = this.props
        this.setState({ firstName, lastName, })
    }

    componentDidMount() {
        this._syncPropsAndState()
    }

    componentDidUpdate() {
        const { shouldSyncPropsAndState } = this.state
        if (shouldSyncPropsAndState) {
            this._syncPropsAndState()
            this.setState({ shouldSyncPropsAndState: false })
        }
    }

    render() {
        const { firstName, lastName, isUpdateInProgress } = this.state
        const { user: { emailAddress }} = this.props
        return(
            <div>
                <TextInput 
                    label='First Name'
                    placeholder='your first name...'
                    value={firstName || ''}
                    onChange={e => this.setState({ firstName: e.target.value })}
                />
                <TextInput 
                    label='Last Name'
                    placeholder='your last name...'
                    value={lastName || ''}
                    onChange={e => this.setState({ lastName: e.target.value })}
                />
                <button
                    onClick={() => {
                        this.setState({ isUpdateInProgress: true })
                        updater.findOneUserAndUpdate({
                            query: { emailAddress },
                            updates: { firstName, lastName, },
                            successActions: [
                                {
                                    description: 'update user general information on profile page',
                                    type: 'session',
                                    updateFunction: ({ res }, state) => {
                                        const updates = res.data.data.findOneUserAndUpdate
                                        const user = { ...state.user, ...updates }
                                        return { ...state, user }
                                    }
                                }
                            ]
                        }).then(() => {
                            this.setState({ isUpdateInProgress: false, shouldSyncPropsAndState: true })
                        })
                    }}
                >{isUpdateInProgress ? 'updating...' : 'update' }</button>
                <button onClick={this._syncPropsAndState}> 
                    clear changes
                </button>
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
                <button>Update</button><button>clear changes</button>
            </div>
        )
    }
} 

/*
|--------------------------------------------------------------------------
| Email Form
|--------------------------------------------------------------------------
*/

export class UserNameForm extends Component {
    state = {
        userName: undefined
    }

    componentDidMount() {
        const { user: { userName }} = this.props
        this.setState({ userName })
    }

    render() {
        const { userName } = this.state
        return(
            <div>
                <TextInput 
                    label='Username'
                    placeholder='your username...'
                    value={userName || ''}
                    onChange={e => this.setState({ userName: e.target.value })}
                />
                <button>Update</button><button>clear changes</button>
            </div>
        )
    }
} 