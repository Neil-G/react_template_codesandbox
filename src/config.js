export default {
    authTokenKey: 'token',
    development: {
        baseUrl: 'http://localhost:5678',
        logoutUrl: 'http://localhost:5678?logout=true',
    },
    test: {},
    production: {
        logoutUrl: '/?logout=true',
    },
}