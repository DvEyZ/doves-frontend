import React from "react";
import { Route, Routes } from "react-router-dom";

import './LabDetails.css';
import { LabDetailsIndex } from "./LabDetailsIndex";
import { MachineDetails } from "./MachineDetails/MachineDetails";

export class LabDetails extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            name: this.props.name,
            type: 'docker',
            up: 100,
            template: 'web-services',
            portPrefix: 1,
            machines: [
                {
                    name: 'machine1',
                    status: 'running'
                },
                {
                    name: 'machine2',
                    status: 'stopped'
                },
                {
                    name: 'machine3',
                    status: 'restarting'
                }
            ],
            loginProviders: [
                {
                    name: 'guacamole-local',
                    type: 'guacamole',
                }
            ]
        }
    }

    render()
    {
        return(
            <Routes>
                <Route path='/' element={<LabDetailsIndex state={this.state}/>}/>
                {
                    this.state.machines.map((v,i) => {
                        return <Route key={i} path={v.name} element={<MachineDetails name={v.name} lab_name={this.state.name}/>}/>;
                    })
                }
            </Routes>
        )
    }
}