import React from "react";
import { Link } from "react-router-dom";
import { DockerTemplateCreator } from "./DockerTemplateCreator/DockerTemplateCreator";

import './TemplateCreator.css'

export class TemplateCreator extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            types: [
                'docker'
            ],
            selectedType: 'docker'
        }
    }

    render()
    {
        return(
            <div>
                <h1>Create template</h1>
                <div><Link to='../' className='a-link'>&lt;&lt;&lt; Back to Templates</Link></div>
                <hr/>
                <div className='form-container'>
                    <form className='lab-creation-form' onSubmit={(e) => {this.submit(e)}}>
                        <h2>Template properties</h2>
                        <div className='lab-creation-form-elem'>
                            <div className='form-value'>
                                <label htmlFor='name'>Name: </label>
                                <br/>
                                <input className='text-input' type='text' id='name' pattern='[A-Za-z0-9_-]+' name='name'
                                title='Name can consist only of letters, numbers, dashes, and floor signs.' required/>
                            </div>
                            <div className='form-value'>
                                <label htmlFor='type'>Type: </label>
                                <br/>
                                <select className='text-input' id='type' name='type'>
                                    {this.state.types.map((v,i) => {
                                        return <option key={i} value={v} onClick={() => {this.setState({selectedType:v})}}>{v}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        {this.state.selectedType === 'docker' && <DockerTemplateCreator/>}
                        <div className='lab-submit-container'>
                            <input type='submit' className='submit-input' value='Create'/>
                            <input type='reset' className='submit-input' value='Reset'/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}