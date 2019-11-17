import { logout } from './../../../../utils'
import { authTokenKey } from './../../../../constants/variableNames'

export default () => {
    return {
        updateType: 'api',
        serviceOptions: {
            method: 'post',
            url: '/graphql',
            data: {
                query: `query {
                    getUserWithToken {
                        id 
                        emailAddress 
                        ${authTokenKey}
                        firstName 
                        lastName 
                        userName
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
                    const token = res.data.data.getUserWithToken[authTokenKey] 
                    if (!!token) localStorage.setItem(authTokenKey, token)
                }
            }
        ],
        failureActions: [
            {
                uiEventFunction: process.env.NODE_ENV === 'production'
                    ? logout
                    : () => {
                        debugger
                    }
            }
        ]
    }
}