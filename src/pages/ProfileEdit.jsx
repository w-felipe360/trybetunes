import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class ProfileEdit extends Component {
  state = {
    isLoading: false,
    user: {
      name: '',
      email: '',
      description: '',
      image: '',
    },
    isSaving: false,
  };

  async componentDidMount() {
    await this.editUser();
  }

  editUser = async () => {
    this.setState({ isLoading: true });
    const user = await getUser();
    this.setState({ user, isLoading: false });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { user } = this.state;
    this.setState({ isSaving: true });
    await updateUser(user);
    this.setState({ isSaving: false });
  };

  render() {
    const { isLoading, user, isSaving } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div>
        <Header />
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              id="name"
              name="name"
              value={ user.name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              value={ user.email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Description:
            <textarea
              id="description"
              name="description"
              value={ user.description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="image">
            Image:
            <input
              type="text"
              id="image"
              name="image"
              value={ user.image }
              onChange={ this.handleChange }
            />
          </label>
          <button type="submit" disabled={ isSaving }>
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    );
  }
}
