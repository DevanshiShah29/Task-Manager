import React, { Component } from 'react'
import { Field, reduxForm } from "redux-form";
import renderField from '../RenderField';

class TaskForm extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        ...this.returnStateObject(),
        
      };
      //this.formValuesUpdate = this.formValuesUpdate.bind(this)
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
        else{
            console.log(this.props.list[this.props.currentIndex]);
            return this.props.list[this.props.currentIndex]
        }   
    };

    componentDidUpdate(prevProps){
        if(prevProps.currentIndex !== this.props.currentIndex || prevProps.list.length !== this.props.list.length){
            this.setState({
                ...this.returnStateObject()
        })}
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name] : e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onAddOrEdit(this.state);
    }

    render() {
        return (
            <div className="form_container">
                <h1>Tasks</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-inner">
                    
                        <div className="form-group">
                            <input
                                name="title"
                                type="text"
                                label="Title"
                                className="form-control"
                                placeholder="Enter Your Title"
                                component={renderField}
                                value={this.props.selectedValue.title === '' ? this.state.title : this.props.selectedValue.title }
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name="time"
                                type="number"
                                label="Time"
                                className="form-control"
                                placeholder="Time Taken"
                                component={renderField}
                                value={this.props.selectedValue.time === '' ? this.state.time : this.props.selectedValue.time }
                                //value={this.state.time}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <Field
                                name="date"
                                type="date"
                                label="Date"
                                className="form-control"
                                placeholder="Date"
                                component={renderField}
                                value={this.state.date}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <Field
                                name="category"
                                type="select"
                                label="Category"
                                className="form-control"
                                placeholder="Select Category"
                                component={renderField}
                                value={this.state.category}
                                onChange={this.handleInputChange}
                            >
                                <option value="work">Work</option>
                                <option value="home">Home</option>
                                <option value="other">Other</option>
                            </Field>
                        </div>
                        <div className="form-group">
                            <Field
                                name="description"
                                type="textarea"
                                label="Description"
                                className="form-control"
                                placeholder="Description"
                                component={renderField}
                                value={this.state.description}
                                onChange={this.handleInputChange}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
        )
    }
}

TaskForm = reduxForm({
    form: 'TaskEditAndAdd'
})(TaskForm);

export default TaskForm;
