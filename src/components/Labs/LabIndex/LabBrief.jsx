import React from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../../../configs/api";

export class LabBrief extends React.Component
{
    startLab = () =>
    {
        fetch(`${apiUrl}/labs/${this.props.name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'start'
            })
        }).then((r) => { this.props.onRefresh(r.json()); })
    }

    stopLab = () =>
    {
        fetch(`${apiUrl}/labs/${this.props.name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'stop'
            })
        }).then((r) => { this.props.onRefresh(r.json()); })
    }

    render()
    {
        return(
            <div className='lab-brief'>
                <img src={`/img/icons/lab-${this.props.type}.svg`} alt={this.props.type} style={{width:'3rem',height:'auto'}}/>
                <div>{this.props.name}</div>
                <div className={`
                    up ${this.props.up === 100 ? 'full-up' : this.props.up > 50 ? 'm2h-up' : 'l2h-up'}                   
                `}>{this.props.up}% up</div>
                <div style={{display:'inline', margin:'auto'}}></div>
                <button className='pod-element-button'>
                    <div className='link' onClick={() => {this.startLab()}}><img src='/img/icons/start.svg' alt='start'/></div>
                </button>
                <button className='pod-element-button'>
                    <div className='link' onClick={() => {this.stopLab()}}><img src='/img/icons/stop.svg' alt='stop'/></div>
                </button>
                <Link className='link' to={this.props.name}><img src='/img/icons/go.svg' alt='go'/></Link>
            </div>
        )
    }
}