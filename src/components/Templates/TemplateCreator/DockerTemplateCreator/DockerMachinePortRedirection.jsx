import React from "react";

export class DockerMachinePortRedirection extends React.Component
{
    render()
    {
        return(
            <div className='port-redir'>
                <input type='text' pattern='\d+' maxLength={5} style={{width:'3rem'}} name={`${this.props.machine}-port-inbound-${this.props.num}`} 
                defaultValue={this.props.inbound ? this.props.inbound : ''}
                className='text-input' required></input>
                <div>=&gt;</div>
                <div>
                    <span className='prefix'>xxx</span>
                    <input type='text' pattern='\d+' maxLength={2} style={{width:'1.5rem'}} name={`${this.props.machine}-port-outbound-${this.props.num}`} 
                    defaultValue={this.props.outbound ? this.props.outbound : ''}
                    className='text-input' required></input>
                </div>
                <button type='button' onClick={() => {this.props.onDelete();}} className='pod-element-button h-button'>
                    <img src='/img/icons/close.svg' alt='remove'/>
                </button>
            </div>
        );
    }
}