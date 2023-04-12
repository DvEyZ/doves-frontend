import React from "react";
import { Link } from "react-router-dom";
import { DockerTemplateCreator, readFile } from "./DockerTemplateCreator/DockerTemplateCreator";
import { Confirm } from "../../Popups/Confirm";

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
            selectedType: 'docker',
            editTemplate: this.props.edit ? {
                name: 'web-services',
                type: 'docker',
                machineDefs: [
                    {
                        name: 'opensuse',
                        ports: [
                            {
                                inbound: '22',
                                outbound: '22'
                            },
                            {
                                inbound: '80',
                                outbound: '80'
                            }
                        ],
                        supplement: {
                            static: false
                        }
                    }
                ],
                supplement: {
                    base: 'test',
                }
            } : null
        }
    }

    submit = async (e) => 
    {
        e.preventDefault();

        let fd = new FormData(e.target);
        let form = Object.fromEntries(fd);

        let data = {};

        data.name = form.name;
        data.type = form.type;
    
        if(data.type === 'docker')
        {
            data.supplement = {
                base: !this.props.edit ? await readFile(form['compose-base']) : form['compose-base']
            }
            
            data.machineDefs = this.docker.state.machineDefs?.map((machine) => {
                return { 
                    name: machine.name,
                    ports: form[`${machine.name}-static-mach`] !== 'on' ? 
                        Array.apply(null, {length: Object.keys(form).filter((v) => {return v.match(`${machine.name}-port-.*`)}).length / 2}).map(Number.call, Number)
                        .map((ord) => {return {
                            inbound: form[`${machine.name}-port-inbound-${ord}`],
                            outbound: form[`${machine.name}-port-outbound-${ord}`]
                        }}) : null,
                    supplement: {
                        static: form[`${machine.name}-static-mach`] === 'on' ? true : false
                    }
                }
            })
        }

        console.log(data);
    }

    render()
    {
        return(
            <div>
                <h1>{ !!this.state.editTemplate ? 'Edit' : 'Create'} template</h1>
                <div><Link to='../' className='a-link'>&lt;&lt;&lt; Back to { !!this.state.editTemplate ? this.state.editTemplate.name :'Templates' }</Link></div>
                <hr/>
                <div className='form-container'>
                    <form className='lab-creation-form' onSubmit={(e) => {
                        if(!this.state.editTemplate) 
                        {
                            this.submit(e)
                        }
                        else
                        {
                            e.preventDefault()
                            this.setState({
                                displayedPopup: {
                                    type: 'confirm',
                                    title: 'Warning!',
                                    text: `You are about to update the template "${this.state.editTemplate.name}".
                                    If you proceed, all labs based on this template will be rebuilt, resulting in resetting them to base state
                                    and erasing all user-made changes. Proceed?`,
                                    onCancel: () => {this.setState({displayedPopup:null})},
                                    onConfirm: () => {this.submit(e);this.setState({displayedPopup:null})}
                                }
                            });
                        }
                    }}>
                        <h2>Template properties</h2>
                        <div className='lab-creation-form-elem'>
                            <div className='form-value'>
                                <label htmlFor='name'>Name: </label>
                                <br/>
                                <input className='text-input' type='text' id='name' pattern='[A-Za-z0-9_-]+' name='name'
                                title='Name can consist only of letters, numbers, dashes, and floor signs.' readOnly={!!this.state.editTemplate}
                                defaultValue={this.state.editTemplate?.name} required/>
                            </div>
                            <div className='form-value'>
                                <label htmlFor='type'>Type: </label>
                                <br/>
                                <select className='text-input' id='type' name='type' selected={this.state.editTemplate?.type}>
                                    {this.state.types.map((v,i) => {
                                        return <option key={i} value={v} onClick={() => {this.setState({selectedType:v})}}
                                        disabled={(this.state.editTemplate?.type !== v) && !!this.state.editTemplate?.type}>{v}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        {this.state.selectedType === 'docker' && <DockerTemplateCreator ref={node => {this.docker = node}} 
                        edit={{machineDefs: this.state.editTemplate?.machineDefs, supplement: this.state.editTemplate?.supplement}}/>}
                        <div className='lab-submit-container'>
                            <input type='submit' className='submit-input' value='Create'/>
                            <input type='reset' className='submit-input' value='Reset'/>
                        </div>
                    </form>
                </div>
                {
                    this.state.displayedPopup &&
                        this.state.displayedPopup.type === 'confirm' ?
                        <Confirm title={this.state.displayedPopup.title} text={this.state.displayedPopup.text}
                        onCancel={this.state.displayedPopup.onCancel} onConfirm={this.state.displayedPopup.onConfirm}/> : null
                }
            </div>
        );
    }
}