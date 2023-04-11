import React from "react";
import { DockerMachinePortRedirection } from "./DockerMachinePortRedirection";

export class DockerMachineDef extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            expanded: false,
            ports: this.props.ports ? this.props.ports.map((v,i) => {
                return {
                    id: i,
                    inbound: v.inbound,
                    outbound: v.outbound
                }
            }) : [],
            port_i: this.props.ports.length,
            excluded: this.props.supplement.static ? this.props.excluded.static : false
        }
    }

    removePortRedirection = (id) =>
    {
        this.setState({ports: this.state.ports.filter((v) => {
            return v.id !== id;
        })})
    }

    render()
    {
        return(
            <div className={`machine-def ${this.state.excluded && 'excluded'}`}>
                <div className='header'>
                    <h3>{this.props.name}</h3>
                    <div style={{margin:'auto'}}></div>
                    <button type='button' className='pod-element-button' onClick={() => {this.setState({expanded: !this.state.expanded})}}>
                        <img src={`/img/icons/arrow-${this.state.expanded ? 'down' : 'right'}.svg`} alt={`${this.state.expanded ? 'collapse' : 'expand'}`}
                        className='expander'/>
                    </button>
                </div>
                <div className={`body ${!this.state.expanded && 'collapsed'}`}>
                    <hr/>
                    <div className='hc'>
                        <h4>Port redirections</h4>
                        <div style={{margin:'auto'}}></div>
                        <button type='button' className='pod-element-button h-button' onClick={() => {
                                this.setState({ports: [...this.state.ports, {id:this.state.port_i}], port_i: this.state.port_i+1, });
                            }} disabled={this.state.excluded}>
                            <img src='/img/icons/plus.svg' alt='create'/>
                        </button>
                    </div>
                    <div className='port-redirections'>
                        {
                            !this.state.excluded &&
                            this.state.ports.map((v,i) => {
                                return <DockerMachinePortRedirection key={i} num={v.id} machine={this.props.name} 
                                inbound={v.inbound ? v.inbound : null} outbound={v.outbound ? v.outbound : null}
                                onDelete={() => {this.removePortRedirection(v.id)}}/>
                            })
                        }
                    </div>
                    <hr/>
                    <div>
                        <input type='checkbox' id='static-mach' name={`${this.props.name}-static-mach`} onChange={(e) => {this.setState({
                            excluded: e.target.checked,
                            ports: e.target.checked ? this.state.ports : []
                        })}}/>
                        <span>Static service <i>{'(Will not be replicated and allocated to users.)'}</i></span>
                    </div>
                </div>
            </div>
        );
    }
}