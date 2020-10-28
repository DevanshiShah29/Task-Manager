import React, { Component } from 'react';
import { connect } from 'react-redux';

var data;

class AllTaskList extends Component {
    
    componentWillMount(){
        this.getAllData();
        this.getCurrentDate();
        this.countDays();
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

    getCurrentDate(separator=','){
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }

    countDays = (day) => {
        const oneDay = 24 * 60 * 60 * 1000;
        const firstDate = new Date(this.getCurrentDate());
        const secondDate = new Date(`${day}`.replace("-", ","));

        return Math.round(Math.abs((firstDate - secondDate) / oneDay));
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
                                <div className="task-date">
                                    {     this.countDays(data.date) === 1 ? this.countDays(data.date)+' day ago' 
                                        : this.countDays(data.date) === 0 ? 'Today'
                                        : this.countDays(data.date)+` days ago`
                                    }
                                </div>
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
        list: state.CRUDReducer.list,
        ...state,
        ...props
    }
}
export default connect(mapStateToProps)(AllTaskList);
