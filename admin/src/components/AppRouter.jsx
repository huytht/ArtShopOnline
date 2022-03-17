// import { Router } from "@material-ui/icons";
import React from "react";
import { BrowserRouter as Router  , Link , Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Display from "./layout/Diplay";
import Login from "./login/Login";
export default function AppRouter() {
return (

    <Router>
        <Switch>
            <Route path="/admin" render= {() => {
                return localStorage.getItem("accessToken") ?  <Display/> : <Redirect to ="/" />
            }}>
                
            </Route>
            <Route path="/">
                <Login/>
            </Route>
        </Switch>
    </Router>
    )
}

// function Admin() {
//     let history = useHistory()
//     let logout = () => {
//         localStorage.removeItem("accessToken")
//         history.replace("/")
//     }
//     return <div>
//         <h2>Admin</h2>
//         <button  onClick ={logout} > Logout </button>
//     </div>
// };
// function Login(){
//     let history = useHistory()
//     let login = () => {
//         localStorage.setItem("accessToken", true)
//         history.replace("/admin")
//     }
//     return <div>
//         <h2>Login</h2>
//         <button onClick = {login}>Login</button>
//     </div>
// };
