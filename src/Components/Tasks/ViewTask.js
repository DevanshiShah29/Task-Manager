import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/TasksAction';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

class ViewTask extends Component {
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

    index = this.props.match.params.id;

    shouldComponentUpdate(prevProps) {
        if (prevProps.currentIndex !== this.props.currentIndex || prevProps.list.length !== this.props.list.length) {
            this.setState({ ...this.returnStateObject() });
            return true;
        }
        else {
            return false;
        }
    }

    componentDidMount() {
        const result = this.props.updateTask(this.state);
        console.log(result, "received props", this.state);
    }

    backgroundColor = () => {
        var color = this.state.category === 'work' || this.state.category === ''? 'blue'
            : this.state.category === 'home' ? 'green'
            : this.state.category === 'other' ? 'pink'
            : null;
        return color;
    }

    render() {
        return (
            <div className={`view_screen ${this.backgroundColor()}`}>
                <div className="header">
                    <Link className="back" to="/">
                        <AiIcons.AiOutlineLeft />
                    </Link>
                    <h2 className="title">Daily Task</h2>
                </div>
                <div className="view_body">
                    <div className="title_container">
                        {
                            this.state.category === 'work' || this.state.category === ''
                                ? <img className="cat_image" src="/Image/Work.png" alt="home" />
                                : null
                        }
                        {
                            this.state.category === 'home'
                                ? <img className="cat_image" src="/Image/Home.png" alt="home" />
                                : null
                        }
                        {
                            this.state.category === 'other'
                                ? <img className="cat_image" src="/Image/other.png" alt="home" />
                                : null
                        }
                        <h2 className="task_title">{this.state.title}</h2>
                    </div>
                    <div className="category_container">
                        {
                            this.state.category === 'work' || this.state.category === '' ? <Link to={{ pathname: '/reports/work', state: { category: 'work'} }} className="work active">Work</Link> : <div className="work">Work</div>
                        }
                        {
                            this.state.category === 'home' ? <Link to={{ pathname: '/reports/home', state: { category: 'home'} }} className="home active">Home</Link> : <div className="home">Home</div>
                        }
                        {
                            this.state.category === 'other' ? <Link to={{ pathname: '/reports/other', state: { category: 'other'} }} className="other active">Other</Link> : <div className="other">Other</div>
                        }
                    </div>
                    <div className="date_time_container">
                        <div className="time"><AiIcons.AiOutlineClockCircle />  {this.state.time} Hours</div>
                        <div className="date"><Link to='/calendar'><FaIcons.FaRegCalendarAlt />  {this.state.date}</Link></div>
                    </div>
                    <div className="description">
                        <p>{this.state.description}</p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        list: state.list,
        currentIndex: state.currentIndex
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateTaskIndex: (index) => dispatch(actions.UpdateIndex(index)),
        updateTask: (data) => dispatch(actions.update(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewTask);