import React, { Component } from 'react';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TaskForm from './TaskForm';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/TasksAction';


class TaskList extends Component {
    //In case of new transaction current index would be -1 otherwise it would be index of that data
    constructor(props) {
        super(props)
        
        this.state = {
            list:this.returnList(),
            currentIndex:-1,
            selected :''
        };
    };

    returnList = () => {
        if(localStorage.getItem('tasksToken') == null) {
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
        this.setState({list, currentIndex: -1}) //update the state
    }

    handleEdit = (index) => {
        this.props.updateTaskIndex(index);
    }

    handleDelete = (index) => {
        this.props.deleteTask(index)
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
                            this.props.list.map((task, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{task.title}</td>
                                    <td>{task.time} h</td>
                                    <td>
                                        <button onClick={() => this.selectedTask(index)} className="btn btn-primary mr-2">View</button>
                                        <button onClick={() => this.handleEdit(index)} className="btn btn-outline-primary mr-2">Edit</button>
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

const mapStateToProps = state => {
    console.log(state.list,"list")
    return {
        list: state.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        deleteTask : (index) => dispatch(actions.Delete(index)),
        updateTaskIndex: (index) => dispatch(actions.UpdateIndex(index))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskList);
