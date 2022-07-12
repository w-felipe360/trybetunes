import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from './Carregando';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      valor: '',
    };
  }

  componentDidMount() {
    this.pegaUser();
  }

  pegaUser = async () => {
    this.setState({ loading: true });
    const pegarUsuario = await getUser();
    this.setState({ valor: pegarUsuario.name });
    this.setState({ loading: false });
  }

  render() {
    const { loading, valor } = this.state;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          {valor}
        </p>
        {
          loading && <Carregando />
        }
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">profile</Link>

      </header>
    );
  }
}
