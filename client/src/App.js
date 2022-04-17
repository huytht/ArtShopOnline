import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Header from "./components/header/header";
import DetailsProduct from "./pages/product/detailsProduct";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path="/" component={DetailsProduct} /> 
            </Switch>
        </BrowserRouter>
    );
}

export default App;
