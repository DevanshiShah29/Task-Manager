import React, { Component } from 'react'
//import { Field, reduxForm } from "redux-form";
//import renderField from '../RenderField';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/TasksAction';

class TaskForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...this.returnStateObject(),
        };
    };

    returnStateObject() {
        if (this.props.currentIndex === -1)
            return {
                title: '',
                time: '',
                date: '',
                category: '',
                description: ''
            }
        else
            return this.props.list[this.props.currentIndex]

    };

    componentDidUpdate(prevProps) {
        if (prevProps.currentIndex !== this.props.currentIndex || prevProps.list.length !== this.props.list.length) {
            this.setState({ ...this.returnStateObject() })
        }
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //this.props.onAddOrEdit(this.state);
        if (this.props.currentIndex === -1) {
            this.props.insertTask(this.state)
        }
        else {
            this.props.updateTask(this.state)
        }
    }

    render() {
        return (
            <div className="form_container">
                <h1>Tasks</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            name="title"
                            type="text"
                            className="form-control"
                            placeholder="Enter Your Title"
                            //value={this.props.selectedValue.title === '' ? this.state.title : this.props.selectedValue.title }
                            onChange={this.handleInputChange}
                            value={this.state.title}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            name="time"
                            type="number"
                            className="form-control"
                            placeholder="Time Taken"
                            value={this.state.time}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            name="date"
                            type="date"
                            className="form-control"
                            placeholder="Date"
                            value={this.state.date}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <select
                            name="category"
                            className="form-control"
                            placeholder="Select Category"
                            value={this.state.category}
                            onChange={this.handleInputChange}
                            //type="select"
                        >
                            <option value="work">Work</option>
                            <option value="home">Home</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input
                            name="description"
                            type="textarea"
                            className="form-control"
                            placeholder="Description"
                            value={this.state.description}
                            onChange={this.handleInputChange}
                        />
                    </div>

                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.list, "list", state) 
    return {
        list: state.list,
        currentIndex: state.currentIndex
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        insertTask: (data) => dispatch(actions.insert(data)),
        updateTask: (data) => dispatch(actions.update(data))
    }
}

// TaskForm = reduxForm({
//     form: 'TaskEditAndAdd'
// })(TaskForm);

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
