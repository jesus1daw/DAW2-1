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

 convertir(moneda, valor){
   if (moneda=="dolar"){
     this.setState({dolares:valor});
     this.setState({euros:valor/0.8});
   }
   if (moneda=="euro"){
     this.setState({dolares:valor*0.8});
     this.setState({euros:valor});
   }
 }

 render() {
   return (
     <div className="App">
     <Moneda moneda="dolar" value={this.state.dolares} convertir={(moneda,valor) => this.convertir(moneda,valor)}/>
     Dólares ---- Euros
     <Moneda moneda="euro" value={this.state.euros} convertir={(moneda,valor) => this.convertir(moneda,valor)}/>

     </div>
   );
 }
}
class Moneda extends Component{
 handleChange(evt) {
    this.props.convertir(this.props.moneda,evt.target.value);
 }
 render(){
   return(
     <input type="number"
     value = {this.props.value}
     onChange={this.handleChange.bind(this)}
     />
   );
 }
}

export default App;
