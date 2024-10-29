import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
 constructor(props) {
   super(props);
   this.state = {
     dolares: 0,
     euros: 0,
   };
 }

 aumentar(){
   this.setState({euros:this.state.euros+1});
   this.setState({dolares:this.state.euros/0.8});
 }
 disminuir(){
   this.setState({euros:this.state.euros-1});
   this.setState({dolares:this.state.euros/0.8});
 }

 render() {
   return (
     <div className="App">
     <br />
     {this.state.euros} euros <Aumentar aumentar={() => this.aumentar()}/><Disminuir disminuir={() => this.disminuir()}/><br />
     {this.state.dolares} dólares<br />
     </div>
   );
 }
}

function Aumentar(props) {
 return (
   <button className="aumentar" onClick={props.aumentar}>
     +
   </button>
 );
}
function Disminuir(props) {
 return (
   <button className="aumentar" onClick={props.disminuir}>
     -
   </button>
 );
}

export default App;
