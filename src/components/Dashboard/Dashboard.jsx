import React from "react";
import './Dashboard.css'
import { Notifications } from "./Notifications";
import { Stats } from "./Stats";

export class Dashboard extends React.Component
{
    render()
    {
        return(
            <div id='dashboard' className='main-elem'>
                <h1>Dashboard</h1>
                <hr/>
                <div id='dashboard-grid'>
                    <Stats/>
                    <Notifications/>
                </div>
            </div>
        );
    }
}