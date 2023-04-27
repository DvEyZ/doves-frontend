import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginProviderIndex } from "./LoginProviderIndex/LoginProviderIndex";

export class LoginProviders extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            loginProviders: [
                {
                    name: 'guacamole-local',
                    type: 'guacamole'
                }
            ]
        }
    }

    render()
    {
        return(
            <div id='login-providers' className='main-elem'>
                <Routes>
                    <Route path='/' element={<LoginProviderIndex loginProviders={this.state.loginProviders}/>}/>
                </Routes>
            </div>
        );
    }
}