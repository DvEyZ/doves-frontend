import React from "react";
import { Link } from "react-router-dom";

export class LoginProviderDetailsIndex extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            type: 'guacamole',
            config: {
                apiUrl: 'http://241.49.175.132:8080/guacamole/api',
                adminUser: 'guacadmin',
                adminPassword: 'guacadmin'
            }
        }
    }

    render()
    {
        return(
            <div>
                <div style={{display:'flex', paddingTop:'2rem', columnGap:'1rem'}}>
                    <h1 style={{paddingTop:'0'}}>{this.props.name}</h1>
                    <button style={{backgroundColor:'inherit', color:'inherit', padding:'0', margin:'0', border:'0', }}>
                        <Link to='edit' className='action-button' style={{textDecoration:'none'}}>
                            <img src='/img/icons/edit.svg' alt=''/>
                            <div style={{fontSize:'1rem', textDecoration:'none'}}>Edit</div>
                        </Link>
                    </button>
                </div>
                <div><Link to='../../' className='a-link'>&lt;&lt;&lt; Back to Login providers</Link></div>
                <hr/>
                <div className="lab-details-container">
                    <div>
                        <h2>Configuration</h2>
                        <div className='summary-table'>
                            <div className='summary-cell summary-key light'>Name</div>
                            <div className='summary-cell summary-value light'>{this.props.name}</div>
                            <div className='summary-cell summary-key dark'>Type</div>
                            <div className='summary-cell summary-value dark'>{this.state.type}</div>
                            {
                                this.state.type === 'guacamole' &&
                                <>
                                    <div className='summary-cell summary-key light'>API URL</div>
                                    <div className='summary-cell summary-value light'><a className="a-link" href={this.state.config.apiUrl}>
                                        {this.state.config.apiUrl}    
                                    </a></div>
                                    <div className='summary-cell summary-key dark'>Admin user</div>
                                    <div className='summary-cell summary-value dark'>{this.state.config.adminUser}</div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}