import React, { Component } from 'react';
import { Link } from 'react-router-dom/';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    name: '',
    loading: true,
  };

  async componentDidMount() {
    const { name } = await getUser();
    this.setState({ name, loading: false });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">profile</Link>
        {loading ? ( // renderizando loading e aparecendo name
          <h1>Carregando...</h1>
        ) : (
          <div>
            <h1 data-testid="header-user-name">{name}</h1>
          </div>
        )}

      </header>
    );
  }
}
