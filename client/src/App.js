import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Context APIs
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';


// Components
import Alert from './components/layouts/Alert';
import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import NotFound from './components/pages/NotFound';

// Routes
import PrivateRoute from './components/routing/PrivateRoute';


// App 
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <>
              <Navbar />
              <Alert />
              <Switch>
                <PrivateRoute
                  exact
                  path="/home"
                  component={Home}
                />
                <Route
                  exact
                  path="/"
                  component={About}
                />
                <Route
                  exact
                  path="/register"
                  component={Register}
                />
                <Route
                  exact
                  path="/login"
                  component={Login}
                />
                <Route
                  component={NotFound}
                />
              </Switch>
            </>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  )
}

export default App
