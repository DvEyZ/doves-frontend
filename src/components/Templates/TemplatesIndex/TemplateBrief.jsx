import React from "react";
import { Link } from "react-router-dom";

export class TemplateBrief extends React.Component
{
    render()
    {
        return(
            <div className='lab-brief'>
                <div className='name'>{this.props.name}</div>
                <img src={`/img/icons/lab-${this.props.type}.png`} alt={this.props.type}/>
                <div style={{display:'inline', margin:'auto'}}></div>
                <Link className='link' to={`${this.props.name}/edit`}><img src='/img/icons/edit.svg' alt='edit'/></Link>
                <Link className='link' to={this.props.name}><img src='/img/icons/go.svg' alt='go'/></Link>
            </div>
        )
    }
}