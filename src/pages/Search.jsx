import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      button: true,
      InputName: '',
      loading: false,
      salvos: [],
      artistName: '',
    };
  }

  ativaBotao = () => {
    const { InputName } = this.state;
    const numeroDois = 2;
    if (InputName.length < numeroDois) {
      return this.setState({ button: true });
    }
    return this.setState({ button: false });
  };

  escreve = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => this.ativaBotao());
  }

  clicar = async () => {
    this.setState({ loading: true });
    const { InputName } = this.state;
    const procurar = await searchAlbumsAPI(InputName);
    this.setState({ artistName: InputName });
    this.setState({ salvos: procurar });
    this.setState({ loading: false });
    this.setState({ InputName: '' });
  }

  render() {
    const { button, InputName, loading, salvos, artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          data-testid="search-artist-input"
          placeholder="Nome do artista."
          type="text"
          name="InputName"
          value={ InputName }
          onChange={ this.escreve }
        />
        <button
          onClick={ this.clicar }
          type="submit"
          disabled={ button }
          data-testid="search-artist-button"
        >
          {' '}
          clica em mim!!

        </button>
        {
          loading && <Carregando />
        }
        {
          salvos.length > 1
            ? <h1>{`Resultado de álbuns de: ${artistName}`}</h1>
            : <p>Nenhum álbum foi encontrado</p>
        }
        {
          salvos.map((album) => (
            <ul key={ album.collectionId }>
              <img src={ album.artworkUrl100 } alt={ album.collectionName } />
              <li>{album.artistName}</li>
              <li>{album.collectionName}</li>
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                Mais informações

              </Link>
            </ul>
          ))
        }
      </div>
    );
  }
}
