import React from 'react';
import ReactDOM from 'react-dom';
import { aleatorio,getSudoku, generaSudoku } from './sudoku.js';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,NavbarBrand } from 'reactstrap';
import Footer from './FooterComponent';

class Casilla extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value, // es el valor que se muestra al usuario en el input
      original: props.original, // es el valor que tiene la casilla en el sudoku resuelto
      fijo: props.fijo, //indicará si es un campo visible y no modificable (readonly=true) o uno jugable (readonly=false)
    };
  }

  handleBlur(evt) {
    /*La función handleBlur es la que controla el evento onBlur (cuando el usuario abandona la casilla).
    Ese es el momento en el que el juego controla si el valor introducido es correcto o no.*/
    if (evt.target.value!=""){
      if (evt.target.value != this.state.original){
        //Si el valor introducido no es igual al original el usuario ha fallado.
          this.props.incFallo();
      }else{
        //El usuario ha acertado. Se suma uno a los aciertos.
          if (this.state.value != evt.target.value){
            this.props.incAcertados();
          }
      }
    }
  }

  render() {
    return (
      <input type="text" className="casilla"
      value={this.state.value} // es el valor que se muestra
      readOnly={this.props.fijo} // si es fijo el campo no es modificable.
      onBlur={this.handleBlur.bind(this)} // se enlaza el evento onBlur con el método handleBlur
      maxlength="1" //se limita a un dígito el número que se puede introducir.
      />
    );
  }
}

class Tablero extends React.Component {

  rellena(){
    generaSudoku();
    var i=0;
    var umbral=80;
    for (i=0;i<81;i++){
/* se van recorriendo las casillas y se saca un número aleatorio entre 0 y 100
Se establece un umbral de 80. Si el número aleatorio supera 80 la casilla estará vacía
 y deshabilitada (readOnly=false) para que juegue el usuario.
 En caso contrario estará readOnly (fija).
*/
      if (aleatorio(0,100) < umbral){
        this.state.casillasMostradas[i]=getSudoku(i); //muestra el valor original de la casilla
        this.state.fijo[i]=true; //coloca la casilla como readOnly
        this.state.acertados+=1;// se lleva un conteo de las casillas acertadas. Si llega a 80 el sudoku estará resuelto
      }
      this.state.casillas[i]=getSudoku(i);
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      casillas: Array(81).fill(null), // contiene el valor de la casilla
      casillasMostradas: Array(81).fill(null), //contiene si la casilla mostrada (inicialmente null).
      fijo: Array(81).fill(false), //contiene si la casilla es fija o jugable
      fallos: 0,  //recuenta el número de fallos
      acertados: 0, //recuenta el número de aciertos. Si es igual a 80 el juego ha terminado
      jugando: "jugando...", //almacena un literal. Cambiará cuando termine el juego
    };
    this.rellena(); //llama a la función rellena para rellenar las casillas y dejarlas fijas o jugables
  }
  incFallo(){ //este método incrementa en uno el número de fallos
    const fallos = this.state.fallos;
    this.setState({fallos:fallos+1});
  }
  incAcertados(){ //este método incrementa en uno el número de acertados
    const acertados=this.state.acertados;
    this.setState({acertados:acertados+1});
    if ((acertados+1) == 81){  //Si acierta 81 el juego ha terminado
      this.setState({jugando:"************PARTIDA TERMINADA*********"});
    }
  }

  renderCasilla(i) {
    return (
      <Casilla
        value={this.state.casillasMostradas[i]}
        original={this.state.casillas[i]}
        fijo={this.state.fijo[i]}
        posicion={i}
        incFallo={() => this.incFallo()} //se envía como props la función incFallo
        incAcertados={() => this.incAcertados()} //se envía como props la función incAcertados
      />
        );
  }

  render() {
    const status = 'Acertados: '+(this.state.acertados)+' Número de fallos: ' + (this.state.fallos);
    return (
      <div>
      <div className="status">{status}</div>
      <div className="tablero-fila">
        {this.renderCasilla(0)}
        {this.renderCasilla(1)}
        {this.renderCasilla(2)}
        {this.renderCasilla(3)}
        {this.renderCasilla(4)}
        {this.renderCasilla(5)}
        {this.renderCasilla(6)}
        {this.renderCasilla(7)}
        {this.renderCasilla(8)}
      </div>
      <div className="tablero-fila">
        {this.renderCasilla(9)}
        {this.renderCasilla(10)}
        {this.renderCasilla(11)}
        {this.renderCasilla(12)}
        {this.renderCasilla(13)}
        {this.renderCasilla(14)}
        {this.renderCasilla(15)}
        {this.renderCasilla(16)}
        {this.renderCasilla(17)}
      </div>
      <div className="tablero-fila">
        {this.renderCasilla(18)}
        {this.renderCasilla(19)}
        {this.renderCasilla(20)}
        {this.renderCasilla(21)}
        {this.renderCasilla(22)}
        {this.renderCasilla(23)}
        {this.renderCasilla(24)}
        {this.renderCasilla(25)}
        {this.renderCasilla(26)}
      </div>
      <div className="tablero-fila">
        {this.renderCasilla(27)}
        {this.renderCasilla(28)}
        {this.renderCasilla(29)}
        {this.renderCasilla(30)}
        {this.renderCasilla(31)}
        {this.renderCasilla(32)}
        {this.renderCasilla(33)}
        {this.renderCasilla(34)}
        {this.renderCasilla(35)}
      </div>
      <div className="tablero-fila">
        {this.renderCasilla(36)}
        {this.renderCasilla(37)}
        {this.renderCasilla(38)}
        {this.renderCasilla(39)}
        {this.renderCasilla(40)}
        {this.renderCasilla(41)}
        {this.renderCasilla(42)}
        {this.renderCasilla(43)}
        {this.renderCasilla(44)}
      </div>
      <div className="tablero-fila">
        {this.renderCasilla(45)}
        {this.renderCasilla(46)}
        {this.renderCasilla(47)}
        {this.renderCasilla(48)}
        {this.renderCasilla(49)}
        {this.renderCasilla(50)}
        {this.renderCasilla(51)}
        {this.renderCasilla(52)}
        {this.renderCasilla(53)}
      </div>
      <div className="tablero-fila">
        {this.renderCasilla(54)}
        {this.renderCasilla(55)}
        {this.renderCasilla(56)}
        {this.renderCasilla(57)}
        {this.renderCasilla(58)}
        {this.renderCasilla(59)}
        {this.renderCasilla(60)}
        {this.renderCasilla(61)}
        {this.renderCasilla(62)}
      </div>
      <div className="tablero-fila">
        {this.renderCasilla(63)}
        {this.renderCasilla(64)}
        {this.renderCasilla(65)}
        {this.renderCasilla(66)}
        {this.renderCasilla(67)}
        {this.renderCasilla(68)}
        {this.renderCasilla(69)}
        {this.renderCasilla(70)}
        {this.renderCasilla(71)}
      </div>
      <div className="tablero-fila">
        {this.renderCasilla(72)}
        {this.renderCasilla(73)}
        {this.renderCasilla(74)}
        {this.renderCasilla(75)}
        {this.renderCasilla(76)}
        {this.renderCasilla(77)}
        {this.renderCasilla(78)}
        {this.renderCasilla(79)}
        {this.renderCasilla(80)}
      </div>
      <div className="status">{this.state.jugando}</div>
      </div>
    );
  }
}
class Header extends React.Component{
  render(){
    return(        <Navbar dark color="primary">
          <div className="container">
           <NavbarBrand href="/">SUDOKU en ReactJS</NavbarBrand>
          </div>
        </Navbar>
      );
  }
}
class Juego extends React.Component {
  render() {
    return (
      <div className="juego">
        <div className="juego-tablero">
          <Header />
          <div className="row justify-content-center">
              <div className="col-auto">
              <Tablero />
              </div>
          </div>
        </div>
        <div className="juego-info">
        </div>
        <Footer />

      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Juego />,
  document.getElementById('root')
);;
