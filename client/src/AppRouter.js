import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './components/Home'

const AppRouter = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Route to="/" component={Home} exact />
        </Switch>
      </BrowserRouter>
    );
};

export default AppRouter;
