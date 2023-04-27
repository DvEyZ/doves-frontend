import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginProviderIndex } from "./LoginProviderIndex/LoginProviderIndex";
import { LoginProviderDetails } from "./LoginProviderDetails/LoginProviderDetails";
import { LoginProviderCreator } from "./LoginProviderCreator/LoginProviderCreator";

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
                    <Route path='/@create' element={<LoginProviderCreator/>}/>
                    {
                        this.state.loginProviders.map((v,i) =>
                            <Route key={i} path={`${v.name}/*`} element={<LoginProviderDetails name={v.name}/>}/>
                        )
                    }
                </Routes>
            </div>
        );
    }
}