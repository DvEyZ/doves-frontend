import React from "react";
import './Footer.css';

export class Footer extends React.Component
{
    render()
    {
        return(
            <div id='footer'>
                <div>Made with 💙 by <a className='a-link' href='https://github.com/DvEyZ'>Szymon Kwiręg</a></div>
            </div>
        )
    }
}