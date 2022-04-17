import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Header from "./components/header/header";
import Account from "./pages/account";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path="/" component={Account} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
