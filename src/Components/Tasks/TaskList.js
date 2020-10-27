import React, { Component } from 'react';
import TaskForm from './TaskForm';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/TasksAction';
import ReactTable from 'react-table';
import "react-table/react-table.css";  
import Pagination from "../../Pagination";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import Modal from 'react-modal';

class TaskList extends Component {
    //In case of new transaction current index would be -1 otherwise it would be index of that data
    constructor(props) {
        super(props)
        
        this.state = {
            list:this.returnList(),
            currentIndex:-1,
            selected :'',
            openPopup : false
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
        this.setState({ openPopup : true })
    }

    handleDelete = (index) => {
        this.props.deleteTask(index)
    }

    handlePopup = () => {
        this.setState({ openPopup : true })
    }

    handleView = (index) => {
        this.props.updateTaskIndex(index);
    }

    globalFilter = (input) => {
        let filteredData = this.props.list.filter((value) => {
            return (
                value.title.toLowerCase().includes(input.toLowerCase()) ||
                value.time.toString().toLowerCase().includes(input.toLowerCase()) ||
                value.description.toLowerCase().includes(input.toLowerCase()) ||
                value.date.toString().toLowerCase().includes(input.toLowerCase()) ||
                value.category.toLowerCase().includes(input.toLowerCase())
            );
        });
        console.log(filteredData,"filtered data")
    };

    handleChange = e => {
        this.globalFilter(e.target.value )
    }
    
    columns = [
        {
            Header:'No.',
            sortable:true,
            id: 'row',
            Cell: (row) => {
                return <div>{row.index + 1}</div>;
            }
        },
        {
            Header:'Task',
            accessor:'title',
            sortable:true
        },
        {
            Header:'Date',
            accessor:'date',
            sortable:true
        },
        {
            Header:'Time',
            accessor:'time',
            className: "thead-dark",
            headerClassName: "thead-dark",
            sortable:true,
            Cell: (props) => {
                //console.log(props)
                return <div>{props.value === '1' ? props.value+ " Hour" : props.value+ " Hours"}</div>;
            }
        },
        {
            Header:'Actions',
            accessor: "Action",
            className: "td_action action-td",
            filterable: false,
            sortable:false,
            headerClassName: "action-th",
            Cell: ({index}) => (
                <>
                    <Link onClick={() => this.handleView(index)} to={`tasks/view/${index}`} className="btn btn-primary mr-2"><AiIcons.AiFillEye/></Link>
                    <button onClick={() => this.handleEdit(index)} className="btn btn-warning mr-2"><FaIcons.FaEdit/></button>
                    <button onClick={() => this.handleDelete(index)} className="btn btn-danger mr-2"><AiIcons.AiFillDelete/></button>  
                </>
            )
        }
    ]

    apiData = this.props.list;
    componentDidUpdate(prevProps) {
        if (prevProps.currentIndex !== this.props.currentIndex || prevProps.list.length !== this.props.list.length) {
            this.apiData = this.props.list;
        }
    }

    closeModalHandler = () =>{
        this.setState({openPopup: false});
    }

    render() {
        return (
            <>
                {
                    this.state.openPopup ? 
                    <Modal isOpen={true} onRequestClose={() => this.setState({ openPopup: false})} ariaHideApp={false}>
                        <div className="button-container">
                            <button className="close-button" onClick={() => this.setState({ openPopup: false})}>X</button>
                        </div>
                        <TaskForm onAddOrEdit={this.onAddOrEdit} closeModalHandler={this.closeModalHandler} currentIndex={this.state.currentIndex} list={this.state.list} />
                    </Modal>
                    :null
                }
                <div className="taskListHeader"> 
                    <h2>Task List </h2>
                    <button onClick={() => this.handlePopup()} className="button">Add Task</button> 
                    <div className="search_container">
                        <input onChange={this.handleChange} placeholder="Search" className="search" label="Search" type="search"/>
                        <AiIcons.AiOutlineSearch/>
                    </div>
                </div>
                <ReactTable
                    data={this.props.list}  
                    columns={this.columns} 
                    defaultPageSize={5} 
                    PaginationComponent={Pagination}
                />
            </>
        )
    }
}

//display data
const mapStateToProps = state => {
    console.log(state.list,"list")
    return {
        list: state.list,
        ...state
    }
}

//updates data
const mapDispatchToProps = (dispatch) => {
    return{
        deleteTask : (index) => dispatch(actions.Delete(index)),
        updateTaskIndex: (index) => dispatch(actions.UpdateIndex(index))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskList);
