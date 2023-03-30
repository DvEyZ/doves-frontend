import React from "react";
import { Notification } from "../Notifications/Notification";

export class Notifications extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            notifications: [
                {
                    id: 1,
                    type:'warning',
                    title: 'Test warning',
                    description: 'test warning',
                    datetime: new Date(2023, 3, 28, 12, 0, 0),
                    activator: {
                        type: 'labs',
                        name: 'lab1'
                    }
                },
                {
                    id: 2,
                    type:'error',
                    title: 'Test error',
                    description: 'test error',
                    datetime: new Date(2023, 3, 28, 12, 0, 0),
                    activator: {
                        type: 'labs',
                        name: 'lab1'
                    }
                },
                {
                    id: 3,
                    type:'info',
                    title: 'Test info',
                    description: 'test info',
                    datetime: new Date(2023, 3, 28, 12, 0, 0),
                    activator: {
                        type: 'labs',
                        name: 'lab1'
                    }
                }
            ]
        }
    }
    
    removeNotification = (id) =>
    {
        this.setState({
            notifications: this.state.notifications.filter((v) => {return v.id !== id})});
    }

    render()
    {
        return(
            <div id='notifications'>
                <h2>Notifications</h2>
                <div id='notification-container' className='pod-container'>
                    {this.state.notifications.map((v) => {
                        return <Notification key={v.id} 
                            type={v.type} title={v.title} description={v.description} activator={v.activator} datetime={v.datetime}
                            onClose={() => {this.removeNotification(v.id)}}
                        />
                    })}
                    {
                        (this.state.notifications.length === 0) &&
                        <div className='empty'>Nothing so far...</div>
                    }
                </div>
            </div>
        )
    }
}