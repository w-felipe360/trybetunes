import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    favorites: [],
    isSaving: false,
  };

  componentDidMount() {
    this.favoritar();
  }

  favoritar = async () => {
    this.setState({
      favorites: await getFavoriteSongs(),
    });
  };

  favoriteSongs = async (event) => {
    const minusOne = -1;
    const { trackId } = this.props;
    const { favorites } = this.state;
    const isChecked = event.target.checked;

    if (isChecked) {
      if (!favorites.some((music) => music.trackId === trackId)) {
        this.setState({ isSaving: true }); // Atualiza o estado do componente para indicar que está carregando
        await addSong({ trackId });
        console.log(await getFavoriteSongs());
        this.setState({
          favorites: [...favorites, { trackId }],
          isSaving: false, // Atualiza o estado do componente para indicar que não está mais carregando
        });
      }
    } else {
      const index = favorites.findIndex((music) => music.trackId === trackId);
      if (index !== minusOne) {
        this.setState({ isSaving: true }); // Atualiza o estado do componente para indicar que está carregando
        await removeSong(favorites[index]);
        console.log(await getFavoriteSongs());
        this.setState({
          favorites: [...favorites.slice(0, index), ...favorites.slice(index + 1)],
          isSaving: false, // Atualiza o estado do componente para indicar que não está mais carregando
        });
      }
    }
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favorites, isSaving } = this.state;
    const isFavorite = favorites.some((music) => music.trackId === trackId);

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
            <label htmlFor="favoriteMusic">
              Favoritar
              <input
                type="checkbox"
                name="favoriteMusic"
                id="favoriteMusic"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.favoriteSongs }
                checked={ isFavorite }
              />
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
