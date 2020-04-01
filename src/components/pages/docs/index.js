import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import updaterMethods from './../../../redux/updater/updaterMethods'
// import { pages } from "./../../../routes";

/*
|--------------------------------------------------------------------------
| Styled Components
|--------------------------------------------------------------------------
*/

const Container = styled.div`
  padding: 8px;
`

/*
|--------------------------------------------------------------------------
| Page Component
|--------------------------------------------------------------------------
*/

export default class DocsPage extends React.Component {
  render() {
    return (
      <Container>
        <h1>Docs</h1>

        {/* UPDATER */}
        <h3>Updater Methods</h3>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>updateType</th>
              <th>args</th>
              <th>success actions</th>
              <th>failure actions</th>
              <th>after actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(updaterMethods).map(methodName => {
              const instructions = updaterMethods[methodName]({})
              const isGraphql = get(
                instructions,
                'serviceOptions.url',
                '',
              ).includes('graphql')
              return (
                <tr>
                  <td>{methodName}</td>
                  <td>
                    {instructions.updateType} {isGraphql && '[graphql]'}
                  </td>
                  <td>
                    {/* {
                                            instructions.args && 
                                            JSON.stringify(instructions.args)
                                                .replace(/['"]+/g, '')
                                                .replace(/[,]+/g, ', ')
                                                .replace(/[{]+/g, '{ ')
                                                .replace(/[:]+/g, ': ')
                                                .replace(/[\]]+/g, '] ')
                                                .replace(/[\[]+/g, '[ ')
                                        } */}
                    {instructions.args &&
                      Object.keys(instructions.args).map(key => {
                        return (
                          <div>
                            {key} [{typeof instructions.args[key]}]
                          </div>
                        )
                      })}
                  </td>
                  <td>
                    <ul>
                      {(instructions.successActions || []).map(action => {
                        return (
                          <li>
                            {action.name || action.description} [{action.type}]{' '}
                            {action.uiEventFunction && `[ui event]`}
                          </li>
                        )
                      })}
                    </ul>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* PATHS */}
        {/* <h3>URL Paths</h3>
                <table>
                    <thead>
                        <tr>
                            <th>pathName</th>
                            <th>path</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(urlPaths).map(pathName => {
                                return <tr>
                                    <td>{pathName}</td>
                                    <td>{urlPaths[pathName]}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table> */}
        <ul></ul>

        {/* PAGES */}
        {/* <h3>Page configuration</h3>
        <table>
          <thead>
            <tr>
              <th>url path</th>
              <th>page</th>
            </tr>
          </thead>
          <tbody>
            {pages.map(({ path, component }) => {
              const pageComponentName =
                get(component, "WrappedComponent.name") ||
                get(component, "name");
              return (
                <tr>
                  <td>{path}</td>
                  <td>{pageComponentName || "default placeholder page"}</td>
                </tr>
              );
            })}
          </tbody>
        </table> */}

        <h3>Redirects</h3>

        <h3>Styles</h3>
      </Container>
    )
  }
}
