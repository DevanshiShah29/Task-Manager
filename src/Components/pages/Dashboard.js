import React, { Component } from 'react'
import TaskList from '../Tasks/TaskList'

class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard">
                <TaskList/>
            </div>
        )
    }
}
export default Dashboard;
