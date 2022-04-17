import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Header from "./components/header/header";
import Product from "./pages/product/product";
import Cart from "./pages/cart/cart";
import Payments from "./pages/payments/payments";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={Product} />
                <Route path="/cart" component={Cart} />
                <Route path="/payments" component={Payments} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
