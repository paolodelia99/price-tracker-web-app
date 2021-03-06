import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from "../auth/Register";
import Login from "../auth/Login";
import Alert from "../Layout/Alert";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../Layout/NotFound";
import Dashboard from "../DashBoard/Dashboard";
import SearchPage from "../DashBoard/SearchPage";

const Routes = () => {
    return (
        <section className='container'>
            <Switch>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute exact path='/dashboard/search' component={SearchPage}/>
                <Route component={NotFound} />
            </Switch>
        </section>
    );
};

export default Routes;