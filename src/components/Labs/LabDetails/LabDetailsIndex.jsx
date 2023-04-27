import React from "react";
import { MachineBrief } from "./MachineBrief";
import { Link } from "react-router-dom";
import { ConfirmPopup } from "../../Popups/ConfirmPopup";

export class LabDetailsIndex extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state = this.props.state;
        this.state.displayedPopup = null;
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
                            <div className='summary-cell summary-key light'>Port prefix</div>
                            <div className='summary-cell summary-value light'>{this.state.portPrefix}</div>
                            <div className='summary-cell summary-key dark'>Login providers</div>
                            <div className='summary-cell summary-value dark' style={{paddingTop:'2px', paddingBottom:'2px'}}>
                                {this.state.loginProviders.map((v,i) => 
                                <div style={{display:'flex', paddingTop:'2px', paddingBottom:'2px'}} key={i}>
                                    <img style={{width:'1.5rem', height:'1.5rem', paddingRight:'2px'}} 
                                    src={`/img/icons/${v.type}-login-provider.svg`}/>{v.name}
                                </div>
                            )}</div>
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
                            <button onClick={() => {
                                this.setState({
                                    displayedPopup: {
                                        type: 'confirm',
                                        title: 'Warning!',
                                        text: `You are about to rebuild the lab "${this.state.name}".
                                        This action will result in resetting all machines to their base state, erasing all changes done to them. Proceed?`,
                                        onCancel: () => {this.setState({displayedPopup: null})},
                                        onConfirm: () => {this.setState({displayedPopup: null})}
                                    }
                                })
                            }}>
                                <div className='action-button dangerous'>
                                    <img src='/img/icons/restart.svg' alt=''/>
                                    <div>Rebuild</div>
                                </div>
                            </button>
                            <button onClick={() => {
                                this.setState({
                                    displayedPopup: {
                                        type: 'confirm',
                                        title: 'Warning!',
                                        text: `You are about to delete the lab "${this.state.name}". This action cannot be undone. Proceed?`,
                                        onCancel: () => {this.setState({displayedPopup: null})},
                                        onConfirm: () => {this.setState({displayedPopup: null})}
                                    }
                                })
                            }}>
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
                {
                    this.state.displayedPopup &&
                        this.state.displayedPopup.type === 'confirm' ?
                        <ConfirmPopup title={this.state.displayedPopup.title} text={this.state.displayedPopup.text}
                        onCancel={this.state.displayedPopup.onCancel} onConfirm={this.state.displayedPopup.onConfirm}/> : null
                }
            </div>
        );
    }
}