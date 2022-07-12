import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

    addSom = async (event) => {
      const { infos } = this.props;
      const { name, checked } = event.target;
      this.setState({ loading: true });
      await addSong(infos);
      this.setState({ loading: false });
      this.setState({ [name]: checked });
      await getFavoriteSongs();
    }

    render() {
      const { previewUrl, trackName, trackId } = this.props;
      const { loading } = this.state;
      return (
        <div>
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ trackName }>
            <input
              type="checkbox"
              id={ trackName }
              data-testid={ `checkbox-music-${trackId}` }
              onClick={ this.addSom }
            />
          </label>
          {
            loading && <Carregando />
          }
        </div>
      );
    }
}
MusicCard.propTypes = {
  previewUrl: PropTypes.string,
}.isRequired;
