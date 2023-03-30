import React from "react";
import { Routes, Route } from "react-router-dom";
import { LabIndex } from "./LabIndex/LabIndex";
import { LabDetails } from "./LabDetails/LabDetails";
import { LabCreator } from "./LabCreator/LabCreator";

export class Labs extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            labs: [
                {
                    name: 'lab1',
                    type: 'docker',
                    up: 100,
                },
                {
                    name: 'lab2',
                    type: 'docker',
                    up: 66,
                },
                {
                    name: 'lab3',
                    type: 'docker',
                    up: 0,
                }
            ],
        }
    }

    render()
    {
        return(
            <div id='labs' className='main-elem'>
                <Routes>
                    <Route path='/' element={<LabIndex labs={this.state.labs}/>}/>
                    <Route path='@create' element={<LabCreator/>}/>
                    {this.state.labs.map((v,i) => {
                        return <Route key={i} path={`/${v.name}/*`} element={<LabDetails name={v.name}/>} />
                    })}
                </Routes>
            </div>
        )
    }
}