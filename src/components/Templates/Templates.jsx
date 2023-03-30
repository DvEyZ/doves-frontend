import React from "react";
import { Route, Routes } from "react-router-dom";
import { TemplatesIndex } from "./TemplatesIndex/TemplatesIndex";

export class Templates extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state = {
            templates: [
                {
                    name: 'web-services',
                    type: 'docker'
                }
            ]
        }
    }

    render()
    {
        return(
            <div id='templates' className='main-elem'>
                <Routes>
                    <Route path='/' element={<TemplatesIndex templates={this.state.templates}/>}/>
                    {
                        this.state.templates.map((v,i) => {
                            return <Route path={`${v.name}/*`}/>
                        })
                    }
                </Routes>
            </div>
        );
    }
}