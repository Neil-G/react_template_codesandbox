import { logout } from './../../../../utils'

export default () => {
    return {
        updateType: 'api',
        serviceOptions: {
            method: 'post',
            url: '/graphql',
            data: {
                query: `query {
                    getUserWithToken {
                        id emailAddress token
                    }
                }
                `
            }
        },
        successActions: [
            {
                description: 'add user and session data to store and refresh token',
                type: 'session',
                updateFunction: ({ res }) => {
                    return { user: res.data.data.getUserWithToken }
                },
                uiEventFunction: ({ res }) => {
                    const { token } = res.data.data.getUserWithToken 
                    if (!!token) localStorage.setItem('token', token)
                }
            }
        ],
        failureActions: [
            {
                uiEventFunction: logout
            }
        ]
    }
}