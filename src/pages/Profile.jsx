import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    user: [],
    isLoading: false,
  };

  async componentDidMount() {
    await this.setUser();
  }

  setUser = async () => {
    this.setState({ isLoading: true });
    const imagePng = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
    const user = await getUser();
    if (user.image === '') {
      user.image = imagePng;
    }
    if (!user.email) {
      user.email = 'Email não cadastrado';
    }
    if (!user.description) {
      user.description = 'Descrição não cadastrada';
    }
    this.setState({ user, isLoading: false });
  };

  render() {
    const { user, isLoading } = this.state;
    if (isLoading) {
      return <p>Carregando...</p>;
    }
    return (
      <div>
        <Header />
        Profile
        <div>
          <h3>{user.name}</h3>
          <h3>{user.email}</h3>
          <p>{user.description}</p>
          <img src={ user.image } alt="profile" data-testid="profile-image" />
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      </div>
    );
  }
}
