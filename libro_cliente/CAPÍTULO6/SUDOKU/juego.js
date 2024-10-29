import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { aleatorio,getSudoku, generaSudoku } from './sudoku.js';


class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      original: props.original,
      capado: props.capado,
      //fallos: props.fallos,
    };
    //this.incFallo = this.props.incFallo.bind(this);
  }

  handleBlur(evt) {
    //console.log("valor state "+this.state.value);
    //console.log("valor original "+this.state.original);
    //console.log("value "+ evt.target.value);
    if (evt.target.value!=""){
      if (evt.target.value != this.state.original){
          //this.setState({value : null});
          //this.state.value= null;
          //this.setState({value:null});***
          //console.log("no acertado");
          this.props.incFallo();
      }else{
          if (this.state.value != evt.target.value){
            this.props.incAcertados();
          }
          //this.state.value=evt.target.value;
          //this.setState({value:evt.target.value});***
          //console.log(this.props.posicion);
          //console.log("acertado");
          //console.log(this.props.posicion);

      }
    }
  }

  render() {
    return (
      //<input type="text" className="square" value={this.props.value} onBlur={() => this.props.onBlur()} />
      //<input type="text" className="square" value={this.state.value} onBlur={() => this.handleBlur()} />
      <input type="text" className="square"
      value={this.state.value}
      readOnly={this.props.capado}
      onBlur={this.handleBlur.bind(this)}
      maxlength="1"
      />
    );
  }
}

/*
function Square(props) {
  return (
    <input type="text" className="square" value={props.value} onBlur={props.onBlur}  />
  );
}
*/
/*VOY POR DECLARING A WINNER*/

class Board extends React.Component {
  rellena(){
    generaSudoku();
    var i=0;
    var umbral=96;
    for (i=0;i<81;i++){

      if (aleatorio(0,100) < umbral){
        this.state.squaresShown[i]=getSudoku(i);
        //this.setState({squaresShown[i]:getSudoku(i)});
        this.state.capado[i]=true;
        this.state.acertados+=1;
      }
      this.state.squares[i]=getSudoku(i);
      this.incFallo = this.incFallo.bind(this);
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(81).fill(null),
      squaresShown: Array(81).fill(null),
      capado: Array(81).fill(false),
      fallos: 0,
      acertados: 0,
      jugando: "jugando...",
    };
    this.rellena();
  }

  incFallo(){
    const fallos = this.state.fallos;
    this.setState({fallos:fallos+1});
    //console.log("ejecutado incfallo");
    //console.log(this.state.fallos);
  }
  incAcertados(){
    const acertados=this.state.acertados;
    this.setState({acertados:acertados+1});
    //console.log("inc acertados "+acertados+1);
    if ((acertados+1) == 81){
      this.setState({jugando:"************PARTIDA TERMINADA*********"});
    }
  }
/*
  handleClick(i) {
    const squares = this.state.squares.slice();

    if ( this.state.xIsNext ){
      squares[i] = 'X';
    }else{
      squares[i] = 'O';
    }
    this.state.xIsNext=!this.state.xIsNext;

    this.setState({squares: squares});
  }

  handleBlur(i){
    console.log("valor interno "+this.state.squares[i]);
    //console.log(this.getState());
  }
*/
  renderSquare(i) {
    return (
          <Square
            value={this.state.squaresShown[i]}
            original={this.state.squares[i]}
            capado={this.state.capado[i]}
            //fallos={this.state.fallos}
            incFallo={() => this.incFallo()}
            incAcertados={() => this.incAcertados()}
            posicion={i}
            //onClick={() => this.handleClick(i)}
            //onBlur={() => this.handleBlur(i)}
          />
        );
  }

  render() {
    const status = 'Numero de fallos: ' + (this.state.fallos);

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="board-row">
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
        </div>
        <div className="board-row">
          {this.renderSquare(18)}
          {this.renderSquare(19)}
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
        </div>
        <div className="board-row">
          {this.renderSquare(27)}
          {this.renderSquare(28)}
          {this.renderSquare(29)}
          {this.renderSquare(30)}
          {this.renderSquare(31)}
          {this.renderSquare(32)}
          {this.renderSquare(33)}
          {this.renderSquare(34)}
          {this.renderSquare(35)}
        </div>
        <div className="board-row">
          {this.renderSquare(36)}
          {this.renderSquare(37)}
          {this.renderSquare(38)}
          {this.renderSquare(39)}
          {this.renderSquare(40)}
          {this.renderSquare(41)}
          {this.renderSquare(42)}
          {this.renderSquare(43)}
          {this.renderSquare(44)}
        </div>
        <div className="board-row">
          {this.renderSquare(45)}
          {this.renderSquare(46)}
          {this.renderSquare(47)}
          {this.renderSquare(48)}
          {this.renderSquare(49)}
          {this.renderSquare(50)}
          {this.renderSquare(51)}
          {this.renderSquare(52)}
          {this.renderSquare(53)}
        </div>
        <div className="board-row">
          {this.renderSquare(54)}
          {this.renderSquare(55)}
          {this.renderSquare(56)}
          {this.renderSquare(57)}
          {this.renderSquare(58)}
          {this.renderSquare(59)}
          {this.renderSquare(60)}
          {this.renderSquare(61)}
          {this.renderSquare(62)}
        </div>
        <div className="board-row">
          {this.renderSquare(63)}
          {this.renderSquare(64)}
          {this.renderSquare(65)}
          {this.renderSquare(66)}
          {this.renderSquare(67)}
          {this.renderSquare(68)}
          {this.renderSquare(69)}
          {this.renderSquare(70)}
          {this.renderSquare(71)}
        </div>
        <div className="board-row">
          {this.renderSquare(72)}
          {this.renderSquare(73)}
          {this.renderSquare(74)}
          {this.renderSquare(75)}
          {this.renderSquare(76)}
          {this.renderSquare(77)}
          {this.renderSquare(78)}
          {this.renderSquare(79)}
          {this.renderSquare(80)}
        </div>
        <div className="status">{this.state.jugando}</div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
