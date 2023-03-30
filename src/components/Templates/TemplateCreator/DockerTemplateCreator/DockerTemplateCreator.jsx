import React from "react";
import YAML from 'yaml';
import { DockerMachineDef } from "./DockerMachineDef";

export class DockerTemplateCreator extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            base: {
                machine_defs:null,
            }
        };
    }

    parseBase = () => 
    {
        let fileReader = new FileReader();
        fileReader.onload = (event) => {
            try
            {
                let base = YAML.parse(event.target.result);
                console.log(base);
                this.setState({base:{machine_defs:Object.keys(base.services)}})
            }
            catch(e)
            {
                alert(e);
            }
        }

        fileReader.readAsText(this.file.files[0], 'utf-8');
    }

    render()
    {
        return(
            <div>
                <h2>Docker properties</h2>
                <div className='lab-creation-form-elem'>
                    <div className='form-value'>
                        <label htmlFor='name'>docker-compose base: </label>
                        <br/>
                        <input className='text-input' type='file' id='compose-base' name='compose_base' ref={(node) => {this.file = node}} 
                        onChange={() => {this.parseBase()}} required />
                    </div>
                    <div className='form-value mach-assoc'>
                        <label>Machine definitions: </label>
                        <br/>
                        <div className='pod-container'>
                            {
                                this.state.base.machine_defs?.map((v,i) => {
                                    return <DockerMachineDef key={i} name={v} /> 
                                })
                            }
                            {!this.state.base.machine_defs && 
                                <div className='empty'>Upload a base file to configure machine definitions.</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}