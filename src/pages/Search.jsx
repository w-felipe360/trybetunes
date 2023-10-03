import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    inputValue: '',
    isLoading: false,
    isSearching: false,
    artistName: '',
    albums: [],
  };

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = async () => {
    const { inputValue } = this.state;
    this.setState({ isLoading: true, isSearching: true, artistName: inputValue });
    const data = await searchAlbumsAPI(inputValue);
    this.setState({ inputValue: '', isLoading: false, isSearching: false, albums: data });
  };

  render() {
    const { inputValue, isLoading, isSearching, artistName, albums } = this.state;
    const isButtonDisabled = inputValue.length < 2;
    return (
      <div data-testid="page-search">
        <Header />
        {!isSearching && (
          <>
            <input
              type="text"
              value={ inputValue }
              onChange={ this.handleInputChange }
              data-testid="search-artist-input"
            />
            <button
              onClick={ this.handleSubmit }
              type="button"
              disabled={ isButtonDisabled }
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </>
        )}
        {isLoading && <p>Carregando...</p>}
        {!isLoading && !isSearching && artistName && (
          <p>
            {`Resultado de álbuns de: ${artistName}`}
          </p>
        )}
        {albums.length > 0 ? albums.map((album) => (
          <ul key={ album.collectionId }>
            <Link
              data-testid={ `link-to-album-${album.collectionId}` }
              to={ `/album/${album.collectionId}` }
            >
              <li>{album.collectionName}</li>
              <li>{album.artistName}</li>

              <img src={ album.artworkUrl100 } alt={ album.collectionName } />

            </Link>
          </ul>
        ))
          : <p> Nenhum álbum foi encontrado </p>}
      </div>
    );
  }
}
