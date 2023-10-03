import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    album: [],
    isLoading: true,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const data = await getMusics(id);
    this.setState({ album: data, isLoading: false });
    console.log('data', data);
  }

  render() {
    const { album, isLoading } = this.state;
    if (isLoading) {
      return <p>Carregando...</p>;
    }
    if (!album || album.length === 0) {
      return (<p>Álbum não encontrado</p>);
    }
    return (
      <div>
        <Header />
        <p data-testid="artist-name">
          { album[0].artistName }
        </p>
        <p data-testid="album-name">
          { album[0].collectionName}
        </p>
        <img src={ album[0].artworkUrl100 } alt="capa do album" />
        {album.slice(1).map((music) => (
          <MusicCard
            key={ music.trackId }
            trackId={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            artworkUrl100={ music.artworkUrl100 }
            data={ music } // Adiciona a propriedade "data" ao objeto passado para o componente MusicCard
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
