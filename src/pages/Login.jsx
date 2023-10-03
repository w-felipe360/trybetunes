import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

const MIN_NAME_LENGTH = 3;

export default class Login extends Component {
  state = {
    name: '',
    loading: false,
    redirect: false,
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = this.state;
    if (name.length >= MIN_NAME_LENGTH) {
      this.setState({ loading: true });
      await createUser({ name });
      this.setState({ redirect: true });
      this.setState({ loading: false });
    }
  };

  render() {
    const { name, loading, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/search" />;
    }

    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            placeholder="insert your name"
            name="name"
            data-testid="login-name-input"
            value={ name }
            onChange={ this.handleChange }
          />
          <button
            onClick={ this.handleSubmit }
            type="submit"
            data-testid="login-submit-button"
            disabled={ name.length < MIN_NAME_LENGTH || loading }
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>
      </div>
    );
  }
}
