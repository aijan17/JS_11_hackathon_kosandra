import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminPanel from './containers/AdminPanel/AdminPanel';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import Cart from './containers/Cart/Cart';
import Home from './containers/Home/Home';
import PrimarySearchAppBar from './containers/Home/MenuAppBar';
import AdminContextProvider from './contexts/AdminContext';
import AuthContextProvider from './contexts/AuthContext';
import ClientContextProvider from './contexts/ClientContext';


const Routes = () => {
    return (
        <ClientContextProvider>
            <AdminContextProvider>
                <AuthContextProvider>
                    <BrowserRouter>
                        <PrimarySearchAppBar />
                        <Switch>
                            <Route exact path="/admin" component={AdminPanel} />
                            <Route exact path="/" component={Home} />
                            <Route exact path="/_page=:page" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/cart" component={Cart} />
                        </Switch>
                    </BrowserRouter>

                </AuthContextProvider>
            </AdminContextProvider>
        </ClientContextProvider>
    );
};

export default Routes;