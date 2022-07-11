import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      InputName: '',
      button: true,
      loading: false,
    };
  }

 ativaBotao = () => {
   const { InputName } = this.state;
   const numeroTres = 3;
   if (InputName.length >= numeroTres) {
     return this.setState({ button: false });
   }
   return this.setState({ button: true });
 }

 escreve = (event) => {
   this.setState({ [event.target.name]: event.target.value }, () => this.ativaBotao());
 }

 voltar = () => {
   const { history } = this.props;
   history.push('/search');
 }

 criaUser = async () => {
   this.setState({ loading: true });
   const { InputName } = this.state;
   await createUser(
     {
       name: InputName,
     },
   ); this.setState({ loading: false }, () => this.voltar());
 }

 render() {
   const { InputName, button, loading } = this.state;
   return (
     <div data-testid="page-login">
       <input
         name="InputName"
         type="text"
         value={ InputName }
         data-testid="login-name-input"
         onChange={ this.escreve }
       />
       <button
         disabled={ button }
         type="submit"
         data-testid="login-submit-button"
         onClick={ this.criaUser }
       >
         Login

       </button>
       {
         loading && <Carregando />
       }
     </div>
   );
 }
}
Login.propTypes = {
  history: PropTypes.object,
}.isRequired;
