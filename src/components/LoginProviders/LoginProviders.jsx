import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginProviderIndex } from "./LoginProviderIndex/LoginProviderIndex";
import { LoginProviderDetails } from "./LoginProviderDetails/LoginProviderDetails";

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
                },
                {
                    name: 'guacamole-remote',
                    type: 'guacamole'
                },
            ]
        }
    }

    render()
    {
        return(
            <div id='login-providers' className='main-elem'>
                <Routes>
                    <Route path='/' element={<LoginProviderIndex loginProviders={this.state.loginProviders}/>}/>
                    {
                        this.state.loginProviders.map((v,i) =>
                            <Route path={v.name} element={<LoginProviderDetails key={i} name={v.name}/>}/>
                        )
                    }
                </Routes>
            </div>
        );
    }
}