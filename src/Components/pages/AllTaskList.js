import React, { Component } from 'react';
import { connect } from 'react-redux';

var data;

class AllTaskList extends Component {
    
    componentWillMount(){
        this.getAllData();
    }

    getAllData(){
        data = this.props.list.map((cat) => { 
            if(cat.category === 'work' 
            || cat.category === 'home' 
            || cat.category === 'other'
            || cat.category === ''){
                return cat;
            }else{
                return null
            }
        }).filter(filtered => filtered !== undefined)
    }

    render() {
        return (
            <div className="right-data">
                {
                    data.filter(c => c.category === this.props.category || this.props.category === "all")
                        .map((data, id) => {
                        return <div className={`card-parent ${data.category}`} key={id}>
                                <span className="tag"></span>
                                <div className="task-title">{data.title}</div>
                                <div className="task-date">{data.date}</div>
                                <div className="task-time">{data.time} Hours</div>
                                <div className="task-description"><span>Summary: </span>{data.description}</div>
                            </div>
                    })
                }
            </div>
        )
    }
}
const mapStateToProps = (state, props) => {
    return {
        list: state.list,
        ...state,
        ...props
    }
}
export default connect(mapStateToProps)(AllTaskList);
