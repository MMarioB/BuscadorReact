import React, { Component } from 'react';
import Buscador from './components/Buscador';
import Resultado from './components/Resultado';

class App extends Component {

  state = {
    termino : '',
    imagenes : [],
    pagina : ''
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }

  paginaAnterior = () => {
    //leemos el state de la pagina actual
    let pagina = this.state.pagina;

    //si la pagina es uno no ir atras
    if(pagina ===1) return null;

    //Restamos uno a la pagina actual
    pagina-=1;

    //agregamos el cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });
    
  }

  paginaSiguiente = () => {
    //leemos el state de la pagina actual
    let pagina = this.state.pagina;

    //sumamos uno a la pagina actual
    pagina+=1;

    //agregamos el cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });

  }

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=18347657-3c3a46ecdd579516f2ef55292&q=${termino}&per_page=30&page=${pagina}`;

    //console.log(url);
    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({imagenes : resultado.hits}) )

  }

  datosBusqueda = (termino) => {
    this.setState({
      termino : termino,
      pagina : 1
    }, () => {
      this.consultarApi();
    })
  }

  render() {
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imágenes</p>
          <Buscador 
            datosBusqueda={this.datosBusqueda}
          
          />
        </div>
        <div className="row justify-content-center">
          <Resultado 
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
  } 
}

export default App;
