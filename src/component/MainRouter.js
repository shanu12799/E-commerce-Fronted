import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Dashboard from'./Dashboard/Dashboard'
import AdminLogin from './Dashboard/AdminLogin'
import LandingPage from './UserInterface/LandingPage';
import UserLogin  from "./UserInterface/UserLogin";
  export default function MainRouter(props){

    return(
        <Router>
            <div>
                <div>
                    <Route path='/AdminLogin' exact strict component={AdminLogin} history={props.history} />
                    <Route path='/Dashboard' exact strict component={Dashboard} history={props.history} />
                    <Route path='/' exact strict component={LandingPage} history={props.history} />
                    <Route path='/UserLogin' exact strict component={UserLogin} history={props.history} />
                    
                    
                </div>
            </div>
        </Router>
        
    )
  }

  