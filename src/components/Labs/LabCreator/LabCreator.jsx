import React from "react";
import { Link } from "react-router-dom";
import '../../App/Forms.css'

export class LabCreator extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            types: [
                'docker', 'kvm'
            ],
            selectedType: 'docker',
            templates: {
                docker: [
                    'web-services',
                ],
                kvm: [
                    'web-services',
                    'routing'
                ]
            },
            loginProviders: [
                {
                    name: 'guacamole-local',
                    type: 'guacamole'
                },
                {
                    name: 'guacamole-remote',
                    type: 'guacamole'
                }
            ]
        }
    }

    submit = (e) => 
    {
        e.preventDefault();
        
        let f = new FormData(e.target);
        
        let data = {};

        data.name = f.get('name');
        data.type = f.get('type');
        data.machineCount = Number(f.get('machine_count'));
        data.template = f.get('template')
        data.portPrefix = Number(f.get('port_prefix'));
        data.loginProviders = f.getAll('login_provider')
        
        console.log(data);
    }

    render()
    {
        return(
            <div>
                <h1>Create lab</h1>
                <div><Link to='../' className='a-link'>&lt;&lt;&lt; Back to Labs</Link></div>
                <hr/>
                <div className='form-container'>
                    <form className='lab-creation-form' onSubmit={(e) => {this.submit(e)}}>
                        <h2>Lab properties</h2>
                        <div className='lab-creation-form-elem'>
                            <div className='form-value'>
                                <label htmlFor='name'>Name: </label>
                                <br/>
                                <input className='text-input' type='text' id='name' pattern='[A-Za-z0-9_]+' name='name'
                                title='Name can consist only of letters, numbers, and floor signs.' required/>
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
                            <div className='form-value'>
                                <label htmlFor='machine_count'>Machine count: </label>
                                <br/>
                                <input className='text-input' type='text' pattern='\d{1,2}' id='machine-count' name='machine_count'
                                title='Machine count must be a number from 1 to 99.' required/>
                            </div>
                            <div className='form-value'>
                                <label htmlFor='template'>Template: </label>
                                <br/>
                                <select className='text-input' id='template' name='template'>
                                    {this.state.templates[this.state.selectedType]?.map((v,i) => {
                                        return <option key={i} value={v}>{v}</option>
                                    })}
                                </select>
                            </div>
                            <div className='form-value'>
                                <label htmlFor='name'>Port prefix: </label>
                                <br/>
                                <input className='text-input' type='text' pattern='[1-5]{1}' id='port-prefix' name='port_prefix'
                                title='Port prefix must be a digit from 1 to 5.' required/>
                            </div>
                            <div className='form-value'>
                                <label htmlFor='name'>Login providers: </label>
                                <br/>
                                <fieldset style={{border:'0', margin:'0', padding:'0', paddingTop:'0.2rem'}}>
                                    {
                                        this.state.loginProviders.map((v,i) => {
                                            return <div style={{display:'inline-flex', marginTop:'2px', marginBottom:'2px'}} key={i}>
                                                <input type="checkbox" name='login_provider' defaultChecked
                                                style={{width:'1rem', height:'1rem'}} value={v.name}/>
                                                <img style={{width:'1.5rem', height:'1.5rem', paddingRight:'2px'}} 
                                                    src={`/img/icons/${v.type}-login-provider.svg`} alt=''/>
                                                <label style={{fontSize:'inherit', color:'inherit'}}>
                                                    {v.name}
                                                </label>
                                            </div>
                                        })
                                    }
                                </fieldset>
                            </div>
                        </div>

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