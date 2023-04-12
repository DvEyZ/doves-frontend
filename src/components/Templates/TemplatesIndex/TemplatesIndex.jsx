import React from "react";
import { Link } from "react-router-dom";
import { TemplateBrief } from "./TemplateBrief";

export class TemplatesIndex extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state = {
            templates: this.props.templates
        }
    }

    render()
    {
        return(
            <div>
                <h1>Templates</h1>
                <hr/>
                <h2>Your templates</h2>
                <div className='pod-container'>
                    {
                        this.state.templates.map((v,i) => {
                            return <TemplateBrief key={i} name={v.name} type={v.type} up={v.up}/>
                        })
                    }
                    {
                        (this.state.templates.length === 0) &&
                        <div className='empty'>Nothing to see here...</div>
                    }
                </div>
                <div className='create-button-container'>
                    <Link to='@create' className='lab-create-button'>
                        <img src='/img/icons/plus.svg' alt=''/>
                        <div>Create a template</div>
                    </Link>
                </div>
            </div>
        );
    }
}