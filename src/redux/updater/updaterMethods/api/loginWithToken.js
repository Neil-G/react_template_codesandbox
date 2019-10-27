export default () => {
    return {
        updateType: 'api',
        serviceOptions: {
            method: 'post',
            url: '/graphql',
            data: {
                query: `query {
                    getUserWithToken {
                        id emailAddress
                    }
                }
                `
            }
        },
        successActions: [
            {
                type: 'session',
                updateFunction: ({ res }) => {
                    return { user: res.data.data.getUserWithToken }
                }
            }
        ]
    }
}