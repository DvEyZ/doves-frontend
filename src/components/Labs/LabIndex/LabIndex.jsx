import React from "react";
import { LabBrief } from "./LabBrief";
import { Link } from "react-router-dom";
import './LabIndex.css'

export class LabIndex extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            labs: this.props.labs,
        }
    }

    render()
    {
        return(
            <div>
                <h1>Labs</h1>
                <hr/>
                <h2>Your labs</h2>
                <div className='pod-container'>
                    {
                        this.state.labs.map((v,i) => {
                            return <LabBrief key={i} name={v.name} type={v.type} up={v.up}/>
                        })
                    }
                    {
                        (this.state.labs.length === 0) &&
                        <div className='empty'>Nothing to see here...</div>
                    }
                </div>
                <div className='create-button-container'>
                    <Link to='@create' className='lab-create-button'>
                        <img src='/img/icons/plus.svg' alt=''/>
                        <div>Create lab</div>
                    </Link>
                </div>
            </div>
        );
    }
}