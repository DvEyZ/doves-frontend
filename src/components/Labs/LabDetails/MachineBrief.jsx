import React from "react";
import { Link } from "react-router-dom";

export class MachineBrief extends React.Component
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
                <div className={`
                    up ${this.props.status === 'running' ? 'machine-running' : 
                    this.props.status === 'stopped' ? 'machine-stopped' :
                    'machine-error'}                   
                `}>{this.props.status}</div>
                <div style={{display:'inline', margin:'auto'}}></div>
                <div className='link' onClick={() => {this.start()}}><img src='/img/icons/start.svg' alt='start'/></div>
                <div className='link' onClick={() => {this.stop()}}><img src='/img/icons/stop.svg' alt='stop'/></div>
                <Link className='link' to={this.props.name}><img src='/img/icons/go.svg' alt='go'/></Link>
            </div>
        );
    }
}