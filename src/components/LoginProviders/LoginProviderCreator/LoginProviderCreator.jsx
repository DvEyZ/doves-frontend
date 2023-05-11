import React from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../../../configs/api";
import { Loading } from '../../Loading/Loading'
import { LoadingError } from '../../Error/LoadingError'

export class LoginProviderCreator extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            types: undefined,
            selectedType: 'guacamole',

            editProvider: undefined,
            loaded: false,
            error: false
        }
    }

    componentDidMount()
    {
        fetch(`${apiUrl}/about`).then((r) => r.json()).then((res) => {
            this.setState({types: res.loginProviderTypes})
        }).then(() => {
            if(this.props.edit)
            {
                fetch(`${apiUrl}/loginProviders/${this.props.edit}`).then((r) => r.json()).then((res) => {
                    this.setState({
                        editProvider: {
                            name: res.name,
                            type: res.type,
                            config: res.config,
                        },
                        loaded: true
                    });
                }).catch((e) => {
                    this.setState({error: e});
                })
            }
            else
            {
                this.setState({loaded:true})
            }
        }).catch((e) => {
            this.setState({error: e});
        })
    }

    submit = (e) => {
        e.preventDefault();

        e.preventDefault();

        let fd = new FormData(e.target);

        let data = {};

        data.name = fd.get('name');
        data.type = fd.get('type');
        
        if(data.type === 'guacamole')
        {
            data.config = {
                apiUrl: fd.get('api-url'),
                adminUsername: fd.get('admin-user'),
                adminPassword: fd.get('admin-pass')
            }
        }

        if(!this.props.edit)    // New provider
        {
            fetch(`${apiUrl}/loginProviders`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data)})
        }
        else    // Update provider
        {
            fetch(`${apiUrl}/loginProviders/${this.state.editProvider.name}`, 
                {method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data)})
        }
    }

    render()
    {
        if(this.state.error)
            return <LoadingError error={this.state.error}/>
            
        return(
            <div>
                <h1>{this.props.edit ? 'Edit' : 'Register'} login provider</h1>
                <div><Link to={`../${this.props.edit ? '..' : ''}`} className='a-link'>&lt;&lt;&lt; Back to login providers</Link></div>
                <hr/>
                {
                    this.state.loaded ?
                    <div className='form-container'>
                        <form className='lab-creation-form' onSubmit={(e) => {this.submit(e)}} autoComplete='off'>
                            <h2>Login provider properties</h2>
                            <div className='lab-creation-form-elem'>
                                <div className='form-value'>
                                    <label htmlFor='name'>Name: </label>
                                    <br/>
                                    <input className='text-input' type='text' id='name' pattern='[A-Za-z0-9_-]+' name='name'
                                    title='Name can consist only of letters, numbers, dashes, and floor signs.' readOnly={!!this.state.editProvider}
                                    defaultValue={this.state.editProvider?.name} required/>
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
                            {
                                this.state.selectedType === 'guacamole' &&
                                <>
                                    <h2>Guacamole properties</h2>
                                    <div className='lab-creation-form-elem'>
                                        <div className='form-value'>
                                            <label htmlFor='name'>API URL: </label>
                                            <br/>
                                            <input className='text-input' type='url' id='api-url' name='api-url'
                                            defaultValue={this.state.editProvider?.config.apiUrl} required/>
                                        </div>    
                                        <div className='form-value'>
                                            <label htmlFor='name'>Admin username: </label>
                                            <br/>
                                            <input className='text-input' type='text' id='admin-user' name='admin-user'
                                            defaultValue={this.state.editProvider?.config.adminUsername} required/>
                                        </div>
                                        <div className='form-value'>
                                            <label htmlFor='name'>Admin password: </label>
                                            <br/>
                                            <input className='text-input' type='password' id='admin-pass' name='admin-pass'
                                            defaultValue={this.state.editProvider?.config.adminPassword} required/>
                                        </div>
                                    </div>
                                </>
                            }
                            <div className='lab-submit-container'>
                                <input type='submit' className='submit-input' value={this.props.edit ? 'Save' : 'Create'}/>
                                <input type='reset' className='submit-input' value='Reset'/>
                            </div>
                        </form>
                    </div> : <Loading/>
                }
            </div>
        );
    }
}