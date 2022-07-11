import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Search from '../pages/Search';
import Favorites from '../pages/Favorites';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import ProfEdit from '../pages/ProfEdit';
import Album from '../pages/Album';

export default class Main extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={ Home } />
        <Route path="/search" component={ Search } />
        <Route path="/Album" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile/edit" component={ ProfEdit } />
        <Route path="/profile" component={ Profile } />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}