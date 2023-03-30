import React from "react";
import { Link } from "react-router-dom";

export class MachineDetails extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state = {
            type: 'docker',
            address: '0.0.0.0',
            status: 'running',
            supplement: {
                ports: [
                    {i:'22',e:'10122'},
                    {i:'80',e:'10180'},
                    {i:'443',e:'10143'}
                ]
            }
        }
    }

    render()
    {
        return(
            <div>
                <h1>{this.props.name}</h1>
                <div><Link to='..' className='a-link'>&lt;&lt;&lt; Back to {this.props.lab_name}</Link></div>
                <hr/>
                <div className='lab-details-container'>
                    <div>
                        <h2>Summary</h2>
                            <div className='summary-table'>
                            <div className='summary-cell summary-key light'>Name</div>
                            <div className='summary-cell summary-value light'>{this.props.name}</div>
                            <div className='summary-cell summary-key dark'>Type</div>
                            <div className='summary-cell summary-value dark'>{this.state.type}</div>
                            <div className='summary-cell summary-key light'>Status</div>
                            <div className={`
                                summary-cell summary-value light ${this.state.status === 'running' ? 'full-up' : this.state.status === 'stopped' ? 'm2h-up' : 'l2h-up'}                   
                            `}>{this.state.status}</div>
                            <div className='summary-cell summary-key dark'>Address</div>
                            <div className='summary-cell summary-value dark'>{this.state.address}</div>
                            {this.state.type === 'docker' && <div className='summary-cell summary-key light'>Ports</div>}
                            {this.state.type === 'docker' && <div className='summary-cell summary-value light'>
                                {this.state.supplement.ports.map((v,i) => {
                                    return <div key={i}>{`${v.i} => ${v.e}`}</div>
                                })}
                            </div>}
                        </div>
                    </div>
                    <div>
                        <h2>Actions</h2>
                        <div className='actions-container'>
                            <button>
                                <div className='action-button'>
                                    <img src='/img/icons/start.svg' alt=''/>
                                    <div>Start</div>
                                </div>
                            </button>
                            <button>
                                <div className='action-button'>
                                    <img src='/img/icons/stop.svg' alt=''/>
                                    <div>Stop</div>
                                </div>
                            </button>
                            <button>
                                <div className='action-button'>
                                    <img src='/img/icons/restart.svg' alt=''/>
                                    <div>Restart</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}