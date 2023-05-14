import React from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../../../configs/api";

export class MachineBrief extends React.Component
{
    startMachine = () => 
    {
        fetch(`${apiUrl}/labs/${this.props.lab}/machines/${this.props.name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'start'
            })
        }).then((r) => { this.props.onRefresh(); })
    }

    stopMachine = () =>
    {
        fetch(`${apiUrl}/labs/${this.props.lab}/machines/${this.props.name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'stop'
            })
        }).then((r) => { this.props.onRefresh(); })
    }

    render()
    {
        return(
            <div className='lab-brief'>
                <div className='name'>{this.props.name}</div>
                <div className={`
                    up ${this.props.status === 'running' ? 'machine-running' : 
                    this.props.status === 'stopped' ? 'machine-stopped' :
                    'machine-error'}                   
                `}>{this.props.status}</div>
                <div style={{display:'inline', margin:'auto'}}></div>
                <button className='pod-element-button'>
                    <div className='link' onClick={() => {this.startMachine()}}><img src='/img/icons/start.svg' alt='start'/></div>
                </button>
                <button className='pod-element-button'>
                    <div className='link' onClick={() => {this.stopMachine()}}><img src='/img/icons/stop.svg' alt='stop'/></div>
                </button>
                <Link className='link' to={this.props.name}><img src='/img/icons/go.svg' alt='go'/></Link>
            </div>
        );
    }
}