const config = require('./../config').default[process.env.NODE_ENV]

export default () => {
    localStorage.removeItem('token')
    return window.location.href = config.logoutUrl
}