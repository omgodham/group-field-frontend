import React from 'react'
import {BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard'

export default function Routes() {
    return (
        <Router>
       <Layout>
        <Switch>
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
        </Switch>
      </Layout>
        </Router>
    )
}