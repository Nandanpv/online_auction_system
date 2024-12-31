
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Auth/Login'; // Adjust the path as necessary
import Dashboard from './components/Dashboard'; // Adjust the path as necessary

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login onLogin={handleLogin} />
                </Route>
                <Route path="/dashboard">
                    {isAuthenticated ? <Dashboard /> : <Redirect to="/login" />}
                </Route>
                <Redirect from="/" to="/login" />
            </Switch>
        </Router>
    );
};

export default App;
