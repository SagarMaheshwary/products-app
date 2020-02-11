import React, { Component } from 'react'
import { Switch, Route } from "react-router-dom";
import Home from '../home/Home'
import ProductIndex from '../products/ProductIndex';
import ProductCreate from '../products/ProductCreate';
import ProductEdit from '../products/ProductEdit';
import ProductShow from '../products/ProductShow';

class AppRouter extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/products" component={ProductIndex} />
                <Route exact path="/products/create" component={ProductCreate} />
                <Route exact path="/products/:id/edit" component={ProductEdit} />
                <Route exact path="/products/:id" component={ProductShow} />
            </Switch>
        )
    }
}

export default AppRouter