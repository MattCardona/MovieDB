import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import SearchMovie from './components/SearchMovie';
import MovieInfo from './components/MovieInfo';
import NotFound from './components/NotFound';
import Actors from './components/Actors/Actors'
import MoreInfo from './components/Actors/MoreInfo';
import SearchActor from './components/Actors/SearchActor';

const AppRouter = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/search/:movie" component={SearchMovie} />
        <Route path="/movie/:id" component={MovieInfo} />
        <Route path="/actors" component={Actors} exact />
        <Route path="/actors/:id" component={MoreInfo} exact />
        <Route path="/actors/search/:name" component={SearchActor} exact />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
