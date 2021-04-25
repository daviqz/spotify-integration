import React from 'react'
import { Switch, Route } from "react-router-dom"
import { createBrowserHistory } from 'history'
// import { BrowserRouter as Router } from "react-router-dom"
import { Router } from "react-router-dom"
//website
import Home from 'pages/Home/Home'
import Spotify from 'pages/Spotify/Spotify'
import Error from 'pages/Error/Error'
import Header from 'components/Header/Header'

const routes = [
    { path: '/', component: Home, exact: true},
    { path: '/spotify', component: Spotify, exact: true },
    { component: Error, exact: true}
]

const hist = createBrowserHistory()

const Routes = () => {
    return (
        <Router history={hist}>
            <Header/>
            <Switch>
                {routes.map((SiteRoute, index) =>
                    <Route key={index} path={SiteRoute.path} exact={SiteRoute.exact} component={SiteRoute.component}/>
                )}
            </Switch>
        </Router>
    )
}

export default Routes