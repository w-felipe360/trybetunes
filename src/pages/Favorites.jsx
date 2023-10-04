import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';

export default class Favorites extends Component {
  state = {
    isLoading: false,
    favoriteSongs: [],
  };

  async componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    this.setState({ isLoading: true });
    const musics = await getFavoriteSongs();
    this.setState({ favoriteSongs: musics, isLoading: false });
  };

  updateFavorites = async () => {
    await this.getFavorites();
  };

  handleFavorites = async (favorites) => {
    this.setState({ favoriteSongs: favorites });
  };

  render() {
    const { isLoading } = this.state;
    const { favoriteSongs } = this.state;
    if (isLoading) {
      return <p>Carregando...</p>;
    }
    if (!favoriteSongs || favoriteSongs.length === 0) {
      return <p>Não há músicas favoritadas</p>;
    }
    return (
      <div>
        <Header />
        {favoriteSongs.map((music) => (
          <MusicCard
            key={ music.trackId }
            trackId={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            artworkUrl100={ music.artworkUrl100 }
            updateFavorites={ this.updateFavorites } // Passa a função updateFavorites como propriedade para o MusicCard
            favorites={ favoriteSongs }
            handleFavorites={ this.handleFavorites }
            data={ music } // Adiciona a propriedade "data" ao objeto passado para o componente MusicCard
          />
        ))}
      </div>
    );
  }
}
