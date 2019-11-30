import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './views/Header';
import Home from './views/Home';
import Login from './views/Login'
import { AuthContext } from './utils/context';
import './App.css';

const App = () => {
  const [authTokens, setAuthTokens] = useState(localStorage.getItem('token'));

  const setTokens = (data) => {
    localStorage.setItem('token', JSON.stringify(data));
    setAuthTokens(data);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setAuthTokens();
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens, removeToken }}>
      <div className="App">
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
