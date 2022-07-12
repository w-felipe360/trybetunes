import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      artista: '',
      infos: [],
    };
  }

  componentDidMount() {
    this.pegaMusica();
  }

    pegaMusica = async () => {
      const { match: { params: { id } } } = this.props;
      // const { infos, artista } = this.state;
      const pega = await getMusics(id);
      this.setState({ infos: [...pega] }, () => {
        this.setState({ artista: pega[0] });
        // console.log(artista);
      });
    };

    render() {
      const { infos, artista } = this.state;
      return (
        <div data-testid="page-album">
          <Header />
          <h1 data-testid="artist-name">{artista.artistName}</h1>
          <p data-testid="album-name">{artista.collectionName}</p>
          {
            infos.map((musica, index) => {
              if (index > 0) {
                return (
                  <MusicCard
                    trackName={ musica.trackName }
                    key={ musica.trackName }
                    previewUrl={ musica.previewUrl }
                  />
                );
              } return null;
            })
          }
        </div>
      );
    }
}
Album.propTypes = {
  match: PropTypes.object,
}.isRequired;
