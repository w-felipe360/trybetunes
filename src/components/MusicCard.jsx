import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    isSaving: false,
    isChecked: false,
  };

  componentDidMount() {
    const { favorites, trackId } = this.props;
    if (favorites.length > 0) {
      const isFavorite = favorites.some(((music) => music.trackId === trackId));
      this.setState({ isChecked: isFavorite });
    }
  }

  favoriteSongs = async (event) => {
    const minusOne = -1;
    const { trackId, favorites, handleFavorites, music } = this.props;
    const isChecked = event.target.checked;

    if (isChecked) {
      if (!favorites.some((favorite) => favorite.trackId === trackId)) {
        this.setState({ isSaving: true });
        await addSong(music);
        const newFavorites = [...favorites, { trackId }];
        handleFavorites(newFavorites);
        this.setState({
          isSaving: false,
        });
      }
    } else {
      const index = favorites.findIndex((favorite) => favorite.trackId === trackId);
      if (index !== minusOne) {
        this.setState({ isSaving: true });
        await removeSong(favorites[index]);
        const newFavorites = favorites
          .filter(((favorite) => favorite.trackId !== trackId));
        this.setState({
          isSaving: false,
        });
        handleFavorites(newFavorites);
      }
    }

    this.setState({ isChecked });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isSaving, isChecked } = this.state;

    return (
      <div>
        { isSaving ? (<Loading />) : (
          <div>
            <h4>{ trackName }</h4>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ `favoriteMusic-${trackId}` }>
              <input
                type="checkbox"
                name="favoriteMusic"
                id={ `favoriteMusic-${trackId}` }
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.favoriteSongs }
                checked={ isChecked }
              />
              Favorita
            </label>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
}.isRequired;

export default MusicCard;
