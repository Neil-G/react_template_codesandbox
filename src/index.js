// https://www.lucidchart.com/documents/edit/d9c3f584-0603-40f3-8998-11cc3e240118/0
import React from "react";
import ReactDOM from "react-dom";
import routes from "./routes";

/*
|--------------------------------------------------------------------------
| Global CSS
|--------------------------------------------------------------------------
*/

import "./styles/index.css";

/*
|--------------------------------------------------------------------------
| Initial Tasks, before application loads
|--------------------------------------------------------------------------
*/

// TODO: extract to util function
const urlParams = new URLSearchParams(window.location.search)
const token = urlParams.get('token')
if (!!token) {
    localStorage.setItem('token', token)
    window.history.replaceState({}, document.title, '/')
}

/*
|--------------------------------------------------------------------------
| Mount application
|--------------------------------------------------------------------------
*/

const rootElement = document.getElementById("root");
ReactDOM.render(routes, rootElement);
