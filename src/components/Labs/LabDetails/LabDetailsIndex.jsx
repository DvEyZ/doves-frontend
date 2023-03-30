import React from "react";
import { MachineBrief } from "./MachineBrief";
import { Link } from "react-router-dom";

export class LabDetailsIndex extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state = this.props.state;
    }

    render()
    {
        return(
            <div>
                <h1>{this.state.name}</h1>
                <div><Link to='../../' className='a-link'>&lt;&lt;&lt; Back to Labs</Link></div>
                <hr/>
                <div className='lab-details-container'>
                    <div>
                        <h2>Summary</h2>
                        <div className='summary-table'>
                            <div className='summary-cell summary-key light'>Name</div>
                            <div className='summary-cell summary-value light'>{this.state.name}</div>
                            <div className='summary-cell summary-key dark'>Type</div>
                            <div className='summary-cell summary-value dark'>{this.state.type}</div>
                            <div className='summary-cell summary-key light'>Status</div>
                            <div className={`
                                summary-cell summary-value light ${this.state.up === 100 ? 'full-up' : this.state.up > 50 ? 'm2h-up' : 'l2h-up'}                   
                            `}>{this.state.up}% up</div>
                            <div className='summary-cell summary-key dark'>Template</div>
                            <div className='summary-cell summary-value dark'>
                                <Link className='a-link' to={`/templates/${this.state.template}`}>{this.state.template}</Link>
                            </div>
                            {this.state.type === 'docker' && <div className='summary-cell summary-key light'>Port prefix</div>}
                            {this.state.type === 'docker' && <div className='summary-cell summary-value light'>{this.state.supplement.prefix}</div>}
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
                            <button>
                                <div className='action-button dangerous'>
                                    <img src='/img/icons/delete.svg' alt=''/>
                                    <div>Delete</div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className='machines-grid-cell'>
                        <h2>Machines</h2>
                        <div className='pod-container'>
                            {this.state.machines.length === 0 && <div className='empty'>Nothing to see here...</div>}
                            {
                                this.state.machines.map((v,i) => {
                                    return <MachineBrief key={i} name={v.name} status={v.status} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}