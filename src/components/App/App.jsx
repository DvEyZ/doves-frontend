import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Menu } from '../Menu/Menu';
import { Footer } from '../Footer/Footer';
import { Dashboard } from '../Dashboard/Dashboard';
import { Labs } from '../Labs/Labs';
import { Templates } from '../Templates/Templates';

import './App.css';
import { LoginProviders } from '../LoginProviders/LoginProviders';
import { Info } from '../Info/Info';

export class App extends React.Component
{
    render()
    {
        return(
            <div id='app'>
                <div id='main'>
                    <BrowserRouter>
                        <Menu/>
                        <Routes>
                            <Route path='/' element={<Dashboard/>}/>
                            <Route path='/labs/*' element={<Labs/>}/>
                            <Route path='/templates/*' element={<Templates/>}/>
                            <Route path='/loginProviders/*' element={<LoginProviders/>}/>
                            <Route path='/about' element={<Info/>}/>
                            <Route path='*' element={<div className='main-elem'>
                                <h1>Oops!</h1>
                                <hr/>
                                <div>The page you requested was not found.</div>
                            </div>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
                <Footer/>
            </div>
        );
    }
}