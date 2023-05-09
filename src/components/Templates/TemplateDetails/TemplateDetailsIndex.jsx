import React from "react";
import { Link } from "react-router-dom";
import { ConfirmPopup } from "../../Popups/ConfirmPopup";
import { apiUrl } from "../../../configs/api";
import { Loading } from "../../Loading/Loading";

export class TemplateDetailsIndex extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state = {
            type: undefined,
            machineDefs: undefined,
            supplement: undefined,

            loaded: false,
            error: false
        }
    }

    componentDidMount()
    {
        fetch(`${apiUrl}/templates/${this.props.name}`).then((r) => r.json()).then((res) => {
            this.setState({
                type: res.type,
                machineDefs: res.machineDefs,
                supplement: res.supplement,
                
                loaded: true
            })
        }).catch((e) => {this.setState({error:e})})
    }

    deleteTemplate = () => {
        this.setState({
            displayedPopup: {
                type: 'confirm',
                title: 'Warning!',
                text: `You are about to delete template ${this.props.name}. This action cannot be undone. Proceed?`,
                onConfirm: () => {
                    this.setState({displayedPopup: null});
                    fetch(`${apiUrl}/templates/${this.props.name}`, {method:'DELETE'})
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
                    <button style={{backgroundColor:'inherit', color:'inherit', padding:'0', margin:'0', border:'0', }}>
                        <Link to='edit' className='action-button' style={{textDecoration:'none'}}>
                            <img src='/img/icons/edit.svg' alt=''/>
                            <div style={{fontSize:'1rem', textDecoration:'none'}}>Edit</div>
                        </Link>
                    </button>
                    <button style={{backgroundColor:'inherit', color:'inherit', padding:'0', margin:'0', border:'0', height:'100%'}} 
                    onClick={() => {this.deleteTemplate()}}>
                        <span className='action-button dangerous' style={{textDecoration:'none'}}>
                            <img src='/img/icons/delete.svg' alt=''/>
                            <div style={{fontSize:'1rem', textDecoration:'none'}}>Delete</div>
                        </span>
                    </button>
                </div>
                <div><Link to='../../' className='a-link'>&lt;&lt;&lt; Back to Templates</Link></div>
                <hr/>
                {
                    this.state.loaded ?
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
                                    return <div key={i} className={`machine-def ${this.state.type === 'docker' && v.supplement &&
                                    v.supplement?.static ? 'excluded' : ''}`}>
                                        <h3>{v.name}</h3>
                                        <hr/>
                                        {v.ports.length > 0 && <h4>Port redirections</h4>}
                                        <div style={{borderLeft: '6px solid rgba(0, 0, 0, 0.3)', paddingLeft: '6px'}}>
                                            {v.ports.map((v,i) => {
                                                return <div key={i}>{v.inbound} {'=>'} <i style={{color:'gray'}}>xxx</i>{v.outbound}</div>
                                            })}
                                        </div>
                                        {this.state.type === 'docker' && v.supplement && v.supplement?.static && <h4>Static</h4>}
                                    </div>
                                })}
                            </div>
                        </div>
                        {
                            this.state.type === 'docker' &&
                            <div style={{gridColumn:'1/3'}}>
                                <h2>Docker-compose base</h2>
                                <pre className='pod-container' style={{display:'block', width:'100%', color:'inherit'}}>
                                    {this.state.supplement.base}    
                                </pre>
                            </div>
                        }
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