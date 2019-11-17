import updater from './../redux/updater'
import logout from './logout'
import { authTokenKey } from './../constants/variableNames'

const getTokenFromUrl = () => {
    // check url for token search param and store it if found
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get(authTokenKey)
    if (!!token) {
        localStorage.setItem(authTokenKey, token)
        window.history.replaceState({}, document.title, '/')
    }
}

export default () => {
    // check url search params for token
    getTokenFromUrl()

    // if a token exists, validate it on the server
    const token = localStorage.getItem(authTokenKey)
    if (!!token) {
        updater.loginWithToken()
    } else {
        logout()
    }

}