import React from "react";
import { Link } from "react-router-dom";

export class TemplateDetailsIndex extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state = {
            type: 'docker',
            machineDefs: [
                {
                    name: 'opensuse',
                    ports: [
                        {
                            inbound: '22',
                            outbound: '22'
                        },
                        {
                            inbound: '80',
                            outbound: '80'
                        }
                    ],
                    supplement: {
                        static: false
                    }
                }
            ],
            supplement: {
                base: 'test',
            }
        }
    }

    render()
    {
        return(
            <div>
                <h1>{this.props.name}</h1>
                <div><Link to='../../' className='a-link'>&lt;&lt;&lt; Back to Templates</Link></div>
                <hr/>
                <div className='lab-details-container'>
                    <div>
                        <h2>Summary</h2>
                        <div className='summary-table'>
                            <div className='summary-cell summary-key light'>Name</div>
                            <div className='summary-cell summary-value light'>{this.props.name}</div>
                            <div className='summary-cell summary-key dark'>Type</div>
                            <div className='summary-cell summary-value dark'>{this.state.type}</div>
                        </div>
                    </div>
                    <div>
                        <h2>Machine definitions</h2>
                        <div className='pod-container'>
                            {this.state.machineDefs.map((v,i) => {
                                return <div key={i} className={`machine-def ${this.state.type === 'docker' && v.supplement.static ? 'excluded' : ''}`}>
                                    <h3>{v.name}</h3>
                                    <hr/>
                                    {v.ports && <h4>Port redirections</h4>}
                                    <div style={{borderLeft: '6px solid rgba(0, 0, 0, 0.3)', paddingLeft: '6px'}}>
                                        {v.ports.map((v,i) => {
                                            if(this.state.type === 'docker')
                                                return <div key={i}>{v.inbound} {'=>'} <i style={{color:'gray'}}>xxx</i>{v.outbound}</div>
                                        })}
                                    </div>
                                    {this.state.type === 'docker' && v.supplement.static && <h4>Static</h4>}
                                </div>
                            })}
                        </div>
                    </div>
                    {
                        this.state.type === 'docker' &&
                        <div style={{gridColumn:'1/3'}}>
                            <h2>Docker-compose base</h2>
                            <code className='pod-container' style={{display:'block', width:'100%', color:'inherit'}}>
                                {this.state.supplement.base}    
                            </code>
                        </div>
                    }
                </div>
            </div>
        );
    }
}