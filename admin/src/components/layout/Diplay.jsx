import React, {useEffect, useState} from 'react'

import './layout.css'

import Sidebar from '../sidebar/Sidebar'
import TopNav from '../topnav/TopNav'
import Routes from '../Routes'

import { BrowserRouter, Route } from 'react-router-dom'



const Display = () => {

    return (
            <BrowserRouter>
                <Route render={(props) => (
                    // <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
                    <div>
                        <Sidebar {...props}/>
                        <div className="layout__content">
                            <TopNav/>
                            <div className="layout__content-main">
                                <Routes/>
                                
                            </div> 
                            
                        </div>
                       
                        
                    </div>
                )}/>
                
                
            </BrowserRouter>   
    )
}

export default Display
