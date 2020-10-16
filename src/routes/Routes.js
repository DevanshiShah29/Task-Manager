import React, { Component } from 'react'
import '../scss/app.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from '../Components/Sidebar/Sidebar';
import Dashboard from '../Components/pages/Dashboard'

class Routes extends Component {
    render() {
        return (
            <>
            <Router>
                <Sidebar/>
                <Switch>
                    <Route path="/" exact component={Dashboard}/>
                </Switch>
            </Router>
            </>
        )
    }
}

export default Routes;
