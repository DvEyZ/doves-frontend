import React from "react";
import { Link } from "react-router-dom";
import { ConfirmPopup } from "../../Popups/ConfirmPopup";
import { apiUrl } from "../../../configs/api";
import { Loading } from "../../Loading/Loading"

export class LoginProviderDetailsIndex extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            loaded: false,
            error: false,
        }
    }

    componentDidMount()
    {
        fetch(`${apiUrl}/loginProviders/${this.props.name}`).then((r) => r.json()).then((res) => {
            this.setState({
                type: res.type,
                config: res.config,
                loaded: true
            });
        }).catch((e) => {
            this.setState({loaded: true, error: e});
        })
    }

    deleteLoginProvider = () => {
        this.setState({
            displayedPopup: {
                type: 'confirm',
                title: 'Warning!',
                text: `You are about to delete template ${this.props.name}. This action cannot be undone. Proceed?`,
                onConfirm: () => {
                    this.setState({displayedPopup: null});
                    // Delete
                    fetch(`${apiUrl}/loginProviders/${this.props.name}`, {method:'DELETE'})
                },
                onCancel: () => {
                    this.setState({displayedPopup: null})
                }
            }
        })
    }

    render()
    {
        return(
            <div>
                <div style={{display:'flex', paddingTop:'2rem', columnGap:'1rem', alignItems:'center'}}>
                    <h1 style={{paddingTop:'0'}}>{this.props.name}</h1>
                    <button style={{backgroundColor:'inherit', color:'inherit', padding:'0', margin:'0', border:'0', height:'100%'}}>
                        <Link to='edit' className='action-button' style={{textDecoration:'none'}}>
                            <img src='/img/icons/edit.svg' alt=''/>
                            <div style={{fontSize:'1rem', textDecoration:'none'}}>Edit</div>
                        </Link>
                    </button>
                    <button style={{backgroundColor:'inherit', color:'inherit', padding:'0', margin:'0', border:'0', height:'100%'}}
                    onClick={() => {this.deleteLoginProvider()}}>
                        <span className='action-button dangerous' style={{textDecoration:'none'}}>
                            <img src='/img/icons/delete.svg' alt=''/>
                            <div style={{fontSize:'1rem', textDecoration:'none'}}>Delete</div>
                        </span>
                    </button>
                </div>
                <div><Link to='../../' className='a-link'>&lt;&lt;&lt; Back to Login providers</Link></div>
                <hr/>
                {
                    this.state.loaded ?
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
                                        <div className='summary-cell summary-value dark'>{this.state.config.adminUsername}</div>
                                    </>
                                }
                            </div>
                        </div>
                    </div> : <Loading/>
                }
                {
                    this.state.displayedPopup?.type === 'confirm' &&
                    <ConfirmPopup title={this.state.displayedPopup.title} text={this.state.displayedPopup.text}
                    onCancel={this.state.displayedPopup.onCancel} onConfirm={this.state.displayedPopup.onConfirm}/>
                }
            </div>
        );
    }
}