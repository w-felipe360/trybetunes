import React, { Component } from 'react';
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

      </header>
    );
  }
}
