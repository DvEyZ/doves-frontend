import React from "react";
import { Route, Routes } from "react-router-dom";
import { TemplatesIndex } from "./TemplatesIndex/TemplatesIndex";
import { TemplateCreator } from "./TemplateCreator/TemplateCreator";
import { TemplateDetailsIndex } from "./TemplateDetails/TemplateDetailsIndex";

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
                    <Route path='@create' element={<TemplateCreator/>}/>
                    {
                        this.state.templates.map((v,i) => {
                            return <Route key={i} path={`${v.name}/*`} element={<TemplateDetailsIndex name={v.name}/>}/>
                        })
                    }
                </Routes>
            </div>
        );
    }
}