import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import SearchMovie from './components/SearchMovie';
import MovieInfo from './components/MovieInfo';

const AppRouter = (props) => {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={ Home } exact />
          <Route path="/search/:movie" component={ SearchMovie } />
          <Route path="/movie/:id" component={ MovieInfo } />
        </Switch>
      </BrowserRouter>
    );
};

export default AppRouter;
