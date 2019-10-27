import updater from './../redux/updater'
import logout from './logout'

const getTokenFromUrl = () => {
    // check url for token search param and store it if found
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    if (!!token) {
        localStorage.setItem('token', token)
        window.history.replaceState({}, document.title, '/')
    }
}

export default () => {
    // check url search params for token
    getTokenFromUrl()

    // if a token exists, validate it on the server
    const token = localStorage.getItem('token')
    if (!!token) {
        updater.loginWithToken()
    } else {
        logout()
    }

}