import React, { Component } from 'react'
import { connect } from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar'
import CountUp from 'react-countup';

class CountUpComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            totalTasks: this.props.list.length
        };
    };
    

    totalTasks = this.props.list.length;

    workTasks = this.props.list.filter(a => a.category === 'work').length;
    homeTasks = this.props.list.filter(a => a.category === 'home').length;
    otherTasks = this.props.list.filter(a => a.category === 'other').length;

    workProgress = (100 * this.workTasks) / this.totalTasks;
    homeProgress = (100 * this.homeTasks) / this.totalTasks;
    otherProgress = (100 * this.otherTasks) / this.totalTasks;

    componentDidUpdate(prevProps) {
        console.log(prevProps.currentIndex,this.props.currentIndex,prevProps.list.length,this.props.list.length,'compoennt did update')
        if (prevProps.currentIndex !== this.props.currentIndex || prevProps.list.length !== this.props.list.length) {
            this.setState({totalTasks: this.props.list.length })
        }
    }

    render() {
        return (
            <div className="count-container"> 
                <div className="total-count count">
                    <h2><CountUp end={this.state.totalTasks} duration={5}/></h2>
                    <div className="category">Total Tasks</div>
                    <div className="progress-bars">
                        <ProgressBar variant="warning" now={100} label={`${Math.round(100)}%`}/>
                    </div>
                </div>
                <div className="total-count count">
                    <h2><CountUp end={this.workTasks} duration={5}/></h2>
                    <div className="category">Work Tasks</div>
                    <div className="progress-bars">
                        <ProgressBar variant="info" now={this.workProgress} label={`${Math.round(this.workProgress)}%`} />
                    </div>
                </div>
                <div className="total-count count">
                    <h2><CountUp end={this.homeTasks} duration={5}/></h2>
                    <div className="category">Home Tasks</div>
                    <div className="progress-bars">
                        <ProgressBar variant="success" now={this.homeProgress} label={`${Math.round(this.homeProgress)}%`}/>
                    </div>
                </div>
                <div className="total-count count">
                    <h2><CountUp end={this.otherTasks} duration={5}/></h2>
                    <div className="category">Other Tasks</div>
                    <div className="progress-bars">
                        <ProgressBar variant="danger" now={this.otherProgress} label={`${Math.round(this.otherProgress)}%`}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.CRUDReducer.list,"list count")
    return {
        list: state.CRUDReducer.list,
        currentIndex: state.CRUDReducer.currentIndex,
    }
}
export default connect(mapStateToProps)(CountUpComponent);