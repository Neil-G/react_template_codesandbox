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
                description: 'add user to users store branch',
                type: 'users',
                updateFunction: ({ res }, state) => {
                    const user = res.data.data.getUserWithToken
                    state[user.id] = user
                    return { ...state }
                }
            },
            {
                description: 'add userId to session',
                type: 'session',
                updateFunction: ({ res }) => {
                    return { userId: res.data.data.getUserWithToken.id }
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