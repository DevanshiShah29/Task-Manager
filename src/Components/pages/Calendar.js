import React, { Component } from 'react';
import { connect } from 'react-redux';
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

class Calendar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            weekendsVisible: true,
            currentEvents: []
        };
    };

    renderSidebarEvent(event, index) {
        return (
            <li key={index}>
                <b>{formatDate(event.date, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
                <i>{event.title}</i>
            </li>
        )
    }

    handleWeekendsToggle = () => {
        this.setState({
            weekendsVisible: !this.state.weekendsVisible
        })
    }

    renderSidebar() {
        return (
            <div className='calendar-sidebar'>
                <div className='calendar-sidebar-section'>
                    <h2>All Events ({this.props.list.length})</h2>
                    <ul>
                        {this.props.list.map(this.renderSidebarEvent)}
                    </ul>
                </div>
            </div>
        )
    }

    background = (category) => {
        let color = category === 'work' ? '#71B6F9'
            : category === 'home' ? '#2EC469'
                : category === 'other' ? '#FB8ACC'
                    : '#A17AFF';
        return color;
    }

    render() {
        return (
            <div className="calendar-container">
                {this.renderSidebar()}
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    footerToolbar={{
                        left: 'custom1,custom2',
                        center: 'weekends',
                        right: 'prev,next'
                    }}
                    customButtons={{
                        custom1: {
                            text: 'Dashboard',
                            click: function () {
                                alert('clicked custom button 1!');
                            }
                        },
                        custom2: {
                            text: 'Reports',
                            click: function () {
                                alert('clicked custom button 2!');
                            }
                        },
                        weekends: {
                            text: 'Weekends',
                            click: () => (this.handleWeekendsToggle()),

                        },
                    }}
                    initialView="dayGridMonth"
                    weekends={this.state.weekendsVisible}
                    //eventContent={renderEventContent}
                    themeSystem='standard'
                    firstDay={1}
                    //weekNumbers= 'true'
                    dayMaxEvents={2}// allow "more" link when too many events
                    height='auto'
                    eventLimit={true}
                    events={
                        this.props.list.map((obj) => {
                            return {
                                title: obj.title,
                                start: obj.date + 'T12:00:00',
                                end: obj.date + 'T13:00:00',
                                backgroundColor: this.background(obj.category),
                                className: obj.category
                            }
                        })
                    }
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.list, "list")
    return {
        list: state.list,
        ...state
    }
}

export default connect(mapStateToProps)(Calendar);