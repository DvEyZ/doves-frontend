import React from "react";
import YAML from 'yaml';
import { DockerMachineDef } from "./DockerMachineDef";

export const readFile = async (file, enc='utf-8') =>
{
    return new Promise((resolve, reject) => {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror = reject
        fileReader.readAsText(file, enc)
    })
}

export class DockerTemplateCreator extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            base: {
                machineDefs: null,
            }
        };
    }

    parseBase = () => 
    {
        readFile(this.file.files[0]).then((file) => {
            try
            {
                let base = YAML.parse(file);
                this.setState({base:{machineDefs:Object.keys(base.services)}})
            }
            catch(e)
            {
                alert(e);
            }
        })
    }

    render()
    {
        return(
            <div>
                <h2>Docker properties</h2>
                <div className='lab-creation-form-elem'>
                    <div className='form-value'>
                        <label htmlFor='compose-base'>docker-compose base: </label>
                        <br/>
                        <input className='text-input' type='file' id='compose-base' name='compose_base' ref={(node) => {this.file = node}} 
                        onChange={() => {this.parseBase()}} required />
                    </div>
                    <div className='form-value mach-assoc'>
                        <label>Machine definitions: </label>
                        <br/>
                        <div className='pod-container'>
                            {
                                this.state.base.machineDefs?.map((v,i) => {
                                    return <DockerMachineDef key={i} name={v} /> 
                                })
                            }
                            {!this.state.base.machineDefs && 
                                <div className='empty'>Upload a base file to configure machine definitions.</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}