import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Menu } from '../Menu/Menu';
import { Footer } from '../Footer/Footer';
import { Dashboard } from '../Dashboard/Dashboard';
import './App.css';
import { Labs } from '../Labs/Labs';
import { Templates } from '../Templates/Templates';

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
                        </Routes>
                    </BrowserRouter>
                </div>
                <Footer/>
            </div>
        );
    }
}