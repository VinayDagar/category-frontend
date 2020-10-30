import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Importing app pages
import ManageCategory from '../pages/manage-category';

export default () => {

    return (
        <Switch>
            {/* Public Routes */}
            <Route exact path="/" component={ManageCategory} />

            <Route exact path="*">
                <Redirect to="/" />
            </Route>
        </Switch>
    );
}
