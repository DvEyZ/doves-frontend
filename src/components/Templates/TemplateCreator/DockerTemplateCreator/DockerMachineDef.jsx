import React from "react";
import { DockerMachinePortRedirection } from "./DockerMachinePortRedirection";

export class DockerMachineDef extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            expanded: false,
            ports: [],
            i: 0
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
            <div className='machine-def'>
                <div className='header'>
                    <h3>{this.props.name}</h3>
                    <div style={{margin:'auto'}}></div>
                    <button className='pod-element-button' onClick={() => {this.setState({expanded: !this.state.expanded})}}>
                        <img src={`/img/icons/arrow-${this.state.expanded ? 'down' : 'right'}.svg`} alt={`${this.state.expanded ? 'collapse' : 'expand'}`}
                        className='expander'/>
                    </button>
                </div>
                <div className={`body ${!this.state.expanded && 'collapsed'}`}>
                    <hr/>
                    <div className='hc'>
                        <h4>Port redirections</h4>
                        <div style={{margin:'auto'}}></div>
                        <button className='pod-element-button' onClick={() => {
                                this.setState({ports: [...this.state.ports, {id:this.state.i}], i: this.state.i+1, });
                            }}>
                            <img src='/img/icons/plus.svg' alt='create'/>
                        </button>
                    </div>
                    <div className='port-redirections'>
                        {
                            this.state.ports.map((v,i) => {
                                return <DockerMachinePortRedirection key={v.id} onDelete={() => {this.removePortRedirection(v.id)}}/>
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}