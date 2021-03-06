import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
 
class Report extends Component {
 
    constructor(props) {
        super(props)
    
        this.state = {
            chartData:props.chartData
        }
    }
 
    static defaultProps = {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'right'
    }
 
    render() {
 
        return (
            <div className="chart"> 
                <Doughnut
                data={this.state.chartData}
                options={{
                    title:{
                        display:this.props.displayTitle,
                        fontSize:25
                    },
                    legend:{
                        display:this.props.displayLegend,
                        position:this.props.legendPosition
                    }
                }}
            />
        </div>
    )
}
}

export default Report ;
