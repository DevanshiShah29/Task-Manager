import React, { Component } from 'react';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TaskForm from './TaskForm';


class TaskList extends Component {
    //In case of new transaction current index would be -1 otherwise it would be index of that data
    constructor(props) {
        super(props)
        
        this.state = {
            list:this.returnList(),
            currentIndex:-1,
            selected :[],
            selectedValue: {
                title: '',
                time: '',
                date: '',
                category: '',
                description: ''
            },
            editButtonClicked: false
        };
    };

    returnList = () => {
        if(localStorage.getItem('tasksToken') == null){
            localStorage.setItem('tasksToken', JSON.stringify([]))
        } 
        return JSON.parse(localStorage.getItem('tasksToken'))
    }
    
    //When user submits the form, we have to save task in list
    onAddOrEdit = (data) => {
        var list = this.returnList(); //Retrive all the tasks added so far
        if(this.state.currentIndex === -1){
            //Insert operation
            list.push(data) //Insert the data
        }  
        else{
            //update operation
            list[this.state.currentIndex] = data;
        } 
        localStorage.setItem('tasksToken', JSON.stringify(list)) // update the local storage
        this.setState({list: list, currentIndex: -1}) //update the state
    }

    handleEdit = (title) => {
        let selectedTask= this.state.list.filter(item => item.title === title);

        selectedTask.map((selectedtask) => {
            this.setState({selectedValue :{
                title: selectedtask.title,
                time: selectedtask.time,
                date: selectedtask.date,
                category: selectedtask.category,
                description: selectedtask.description
            },
            editButtonClicked: !this.state.editButtonClicked
            })
        })
    }

    handleDelete = (index) => {
        var list = this.returnList() // Retrive the list
        if (window.confirm("Are you sure you want to delete this task?")) {
            list.splice(index , 1)
            localStorage.setItem('tasksToken', JSON.stringify(list))
            this.setState({list, currentIndex:-1})
        } else {
            localStorage.setItem('tasksToken', JSON.stringify(list))
            this.setState({list, currentIndex:-1})
        }
    }

    render() {
        return (
            <>
                <TaskForm onAddOrEdit={this.onAddOrEdit} currentIndex={this.state.currentIndex} list={this.state.list} selectedValue={this.state.selectedValue} editButtonClicked={this.state.editButtonClicked}/>

                <table className="table border shadow">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Task</th>
                            <th scope="col">Time</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.list.map((task, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{task.title}</td>
                                    <td>{task.time} h</td>
                                    <td>
                                        <button onClick={() => this.selectedTask(index)} className="btn btn-primary mr-2">View</button>
                                        <button onClick={() => this.handleEdit( task.title)} className="btn btn-outline-primary mr-2">Edit</button>
                                        <button onClick={() => this.handleDelete(index)} className="btn btn-danger mr-2">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </>
        )
    }
}

export default TaskList;
