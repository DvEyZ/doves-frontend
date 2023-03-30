import React from "react";
import { Link } from "react-router-dom";

export class LabBrief extends React.Component
{
    start = () =>
    {
        setTimeout(() => {}, 1000);
    }

    stop = () =>
    {
        setTimeout(() => {}, 1000);
    }

    render()
    {
        return(
            <div className='lab-brief'>
                <div className='name'>{this.props.name}</div>
                <img src={`/img/icons/lab-${this.props.type}.png`} alt={this.props.type}/>
                <div className={`
                    up ${this.props.up === 100 ? 'full-up' : this.props.up > 50 ? 'm2h-up' : 'l2h-up'}                   
                `}>{this.props.up}% up</div>
                <div style={{display:'inline', margin:'auto'}}></div>
                <button className='pod-element-button'>
                    <div className='link' onClick={() => {this.start()}}><img src='/img/icons/start.svg' alt='start'/></div>
                </button>
                <button className='pod-element-button'>
                    <div className='link' onClick={() => {this.stop()}}><img src='/img/icons/stop.svg' alt='stop'/></div>
                </button>
                <Link className='link' to={this.props.name}><img src='/img/icons/go.svg' alt='go'/></Link>
            </div>
        )
    }
}