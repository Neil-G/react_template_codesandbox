// https://www.lucidchart.com/documents/edit/d9c3f584-0603-40f3-8998-11cc3e240118/0
import React from "react";
import ReactDOM from "react-dom";
import routes from "./routes";

import "./styles.css";

/*
|--------------------------------------------------------------------------
| Initial Tasks, before application loads
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Mount application
|--------------------------------------------------------------------------
*/

const rootElement = document.getElementById("root");
ReactDOM.render(routes, rootElement);
