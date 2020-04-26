import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';

import Home from './components/Home';
import SearchMovie from './components/SearchMovie';
import MovieInfo from './components/MovieInfo';
import NotFound from './components/NotFound';
import Actors from './components/Actors/Actors'
import MoreInfo from './components/Actors/MoreInfo';
import SearchActor from './components/Actors/SearchActor';
import Signup from './components/Users/Signup';
import Signin from './components/Users/Signin';
import ShowInfo from './components/ShowInfo';

const AppRouter = (props) => {
  return (
    <Provider store={store()}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/search/" component={SearchMovie} exact />
          <Route path="/search/:movie" component={SearchMovie} exact />
          <Route path="/movie/:id" component={MovieInfo} />
          <Route path="/tv/:id" component={ShowInfo} />
          <Route path="/actors" component={Actors} exact />
          <Route path="/actors/:id" component={MoreInfo} exact />
          <Route path="/actors/search/:name" component={SearchActor} exact />
          {/* auth routes make HOC for secure routes*/}
          <Route path="/signup" component={Signup} exact />
          <Route path="/signin" component={Signin} exact />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default AppRouter;
