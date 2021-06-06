import React, { Component } from 'react'
import "./Conversor.css"

export default class Conversor extends Component {

    //Construtor criado para acessar as propriedades do App.js
    constructor(props) {
        super(props);

        //define o estado inicial
        this.state = {
            moedaA_valor: "",
            moedaB_valor: 0,
        }
        //passa o objeto this utilizando o bind
        this.converter = this.converter.bind(this)
    }

    converter(){
        let de_para = `${this.props.moedaA}_${this.props.moedaB}`;
        //api pra pegar o valor do dólar
        let url = `http://free.currencyconverterapi.com/api/v5/convert?q=${de_para}&apiKey=7d3b4069bb8b623f0e42&compact=y`
        //acessar url e pegar o dado Convertido (promisse)
        fetch(url)
        .then(res=>{
            return res.json()
        })
        .then(json=>{
            let cotacao = json[de_para].val;
            let moedaB_valor = (parseFloat(this.state.moedaA_valor) * cotacao).toFixed(2);
            this.setState({moedaB_valor})
        }) 
    }

    render() {
        return (
            <div className="conversor">
                {/* acessa o parâmetro do Conversor no App.js */}
                <h2>{this.props.moedaA} para {this.props.moedaB}</h2>
                <input type="text" onChange={(event)=>{this.setState({moedaA_valor: event.target.value})}}></input>
                <button type="button" onClick = {this.converter}>Converter</button>
                <h2>{this.state.moedaB_valor}</h2>
            </div>
        )
    }
}