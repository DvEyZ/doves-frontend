import React from "react";
import { LoginProviderDetailsIndex } from "./LoginProviderDetailsIndex";
import { Route,Routes } from "react-router-dom";

export class LoginProviderDetails extends React.Component
{
    render()
    {
        return(
            <Routes>
                <Route path='/' element={<LoginProviderDetailsIndex name={this.props.name}/>}/>
            </Routes>
        )
    }
}