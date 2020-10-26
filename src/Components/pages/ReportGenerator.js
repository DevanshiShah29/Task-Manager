import React, { Component } from 'react';
import Report from './Report';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import AllTaskComponent from './AllTaskList';

var workHour;
var homeHour;
var otherHour;

class ReportGenerator extends Component {
    constructor(){
        super();
        this.state = {
          chartData:{},
          selectedCategory: "all"
        }
    }
 
    componentWillMount(){
        this.getCategoryWiseData();
        this.getProps();
        this.getChartData();
    }
 
    getCategoryWiseData(){
        workHour = this.props.list.map((task) => (
           task.category === "work" || task.category === "" ? +task.time : null
        )).reduce((a, b) => a + b, 0)

        homeHour = this.props.list.map((task) => (
            task.category === "home" ? +task.time : null
        )).reduce((a, b) => a + b, 0)

        otherHour = this.props.list.map((task) => (
            task.category === "other" ? +task.time : null
        )).reduce((a, b) => a + b, 0)
    }
    
    getChartData(){
        this.setState({
          chartData:{
            labels: [ "Work", "Home", "Other" ],
            datasets:[
              {
                label:'time',
                data: [ workHour, homeHour, otherHour ],
                backgroundColor:[
                  '#71B6F9',
                  '#2EC469',
                  '#FB8ACC'
                ]
              }
            ]
          }
        });
    }

    getProps(){
        if (this.props.history.location.state && this.props.history.location.state.category) {
            this.setState({
                selectedCategory: this.props.history.location.state.category
            });
        }
    }

    selectCategory(category) {
        this.setState({
            selectedCategory: category
        });
    }

    render() {
        return (
            <div className="main-title">
                <div className="header">
                    <Link className="back" to="/">
                        <AiIcons.AiOutlineLeft />
                    </Link>
                    <h2 className="title">Categorised Data</h2>
                </div>
            
                <div className="tabs">
                    <button className={this.state.selectedCategory === "all" ? "active" : ""} onClick={() => this.selectCategory("all")}>All</button>
                    <button className={this.state.selectedCategory === "work" ? "active" : ""} onClick={() => this.selectCategory("work")}>Work</button>
                    <button className={this.state.selectedCategory === "home" ? "active" : ""} onClick={() => this.selectCategory("home")}>Home</button>
                    <button className={this.state.selectedCategory === "other" ? "active" : ""} onClick={() => this.selectCategory("other")}>Other</button>
                </div>
                <hr/>
                <Report chartData={this.state.chartData} legendPosition="bottom"/>
                <AllTaskComponent category={this.state.selectedCategory}/>
            </div>
        )
    }
}
 
const mapStateToProps = state => {
    return {
        list: state.list
    }
}
export default connect(mapStateToProps)(ReportGenerator);
