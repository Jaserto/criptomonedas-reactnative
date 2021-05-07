
import React, {useState, useEffect} from 'react';
import Header from  './components/Header';
import {StyleSheet, Image, View, ScrollView} from 'react-native';
import Formulario from './components/Formulario'
import axios from 'axios';
import Cotizacion from './components/Cotizacion';

const App = () => {
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [consultarAPI, guardarConsultarAPI] = useState(false);
  const [resultado, guardarResultado] = useState({});

  useEffect(() => {
    console.log('Consuiltar API ha cambiado');
    const cotizarCriptomoneda = async () => {
      if(consultarAPI){
        //consultar la api para mostrar los datos
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const res = await axios.get(url);
      console.log(res.data.DISPLAY[criptomoneda][moneda]);
        guardarResultado(res.data.DISPLAY[criptomoneda][moneda]);
        guardarConsultarAPI(false);

        console.log(resultado);
      }
    }
    cotizarCriptomoneda();
  }, [consultarAPI])

  return (
    <>
    <ScrollView>
      <Header />

        <Image
        style={styles.imagen}
        source= {require('./assets/img/cryptomonedas.png')}
        />

        <View style={styles.contenido}>
           <Formulario
            moneda={moneda}
            criptomoneda={criptomoneda}
            guardarCriptomoneda={guardarCriptomoneda}
            guardarMoneda={guardarMoneda}
            guardarConsultarAPI={guardarConsultarAPI}
           />
         
        </View>
        <Cotizacion
              resultado={resultado} />
     </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }

})

export default App;
