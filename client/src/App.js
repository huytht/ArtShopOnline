import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Header from "./components/header/header";
import Home from "./pages/home/home";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
