import React, { Component } from 'react'
import '../scss/app.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from '../Components/Sidebar/Sidebar';
import Dashboard from '../Components/pages/Dashboard';
import ViewTask from '../Components/Tasks/ViewTask';

class Routes extends Component {
    render() {
        return (
            <>
            <Router>
                <Sidebar/>
                <Switch>
                    <Route path="/" exact component={Dashboard}/>
                    <Route path="/tasks/view/:id" component={ViewTask} />
                </Switch>
            </Router>
            </>
        )
    }
}

export default Routes;
