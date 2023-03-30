import React from "react";

export class DockerMachinePortRedirection extends React.Component
{
    render()
    {
        return(
            <div className='port-redir'>
                <input type='text' maxLength={5} style={{width:'3rem'}} className='text-input'></input>
                <div>=&gt;</div>
                <div>
                    <span className='prefix'>xxx</span>
                    <input type='text' maxLength={2} style={{width:'1.5rem'}} className='text-input'></input>
                </div>
                <button onClick={() => {this.props.onDelete();}} className='pod-element-button'>
                    <img src='/img/icons/close.svg' alt='remove'/>
                </button>
            </div>
        );
    }
}