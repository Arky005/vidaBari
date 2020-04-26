import React, { useState } from 'react';
import { IonRouterOutlet, IonList, IonItem, IonButton, IonMenu, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonTabs, IonIcon, IonTabBar, IonTabButton, IonLabel, IonInput } from '@ionic/react';
import './IMC.css';
import { useLocation, useHistory } from 'react-router';
import logo from '../images/logo2.png'
import Menu from '../components/Menu';
import { happy } from 'ionicons/icons';
import {  Route } from 'react-router-dom';
import Tabs from '../components/Tabs'
import GaugeChart  from 'react-gauge-chart';
import { presentToast } from '../toast';

const IMC: React.FC = () => {
  const location = useLocation() as any;
  const user = location?.state?.user;
  const [peso, setPeso] = useState(0.0);
  const [altura, setAltura] = useState(0.0);
  const [valorIMC, setValorIMC] = useState(0);

  const calcularIMC = () =>{
      if( !(isNaN(peso) || peso<=0.0 || isNaN(altura) || altura<=0.0) ){
        setValorIMC(peso/(altura*altura));
      } else presentToast('Valores inválidos.')
  }

  const calcularValorChart = () => {

    try {
      if(valorIMC>5 && valorIMC<18.5){
        document.getElementById('texto-imc')!.innerHTML="Você está abaixo do peso ideal.";
        return 0.08;
      } else if(valorIMC>=18.5 && valorIMC<25){
        document.getElementById('texto-imc')!.innerHTML="Você está em seu peso ideal.";
        return 0.25;
      } else if (valorIMC>=25&&valorIMC<30){
        document.getElementById('texto-imc')!.innerHTML="Você está com sobrepeso.";
        return 0.44;
      } else if(valorIMC>=30&&valorIMC<35){
        document.getElementById('texto-imc')!.innerHTML="Você está com obesidade grau 1.";
        return 0.57;
      }else if(valorIMC>=35&&valorIMC<40){
        document.getElementById('texto-imc')!.innerHTML="Você está com obesidade grau 2.";
        return 0.75;
      }else if(valorIMC>40){
        document.getElementById('texto-imc')!.innerHTML="Você está com obesidade grau 3.";
        return 0.95;
      }else {
        document.getElementById('texto-imc')!.innerHTML="";
        return 0;
      }
    } catch(error){
      return 0;
    }
  }

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="light">
          <IonButtons slot="start">
              <IonMenuButton id="botao-menu"/>
            </IonButtons>
            <div id="bar-home">
              <img src={logo} width="40px" height="40px"/>
              <span id="titulo-home"><i>Calculadora IMC</i></span>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent color="secondary">
          <div id="chart-container">
            <GaugeChart id="gauge-chart1" nrOfLevels={6} percent={calcularValorChart()} colors={["#00adfc", "#1cc716", "yellow", "#ff5e00", "#ff2f00", "red"]} needleColor="grey" needleBaseColor="grey" formatTextValue={()=>valorIMC.toFixed(2)} textColor="black"/>
          </div>
          <div id="texto-imc">
            
          </div>
          <div id="imc-campos-container">
            <IonItem color="light" className="input-imc">
              <IonLabel position="floating">Peso(KG)</IonLabel>
              <IonInput type="number" onIonChange={(e:any) => setPeso(e.target.value)}></IonInput>
            </IonItem>
            <IonItem color="light" className="input-imc">
              <IonLabel position="floating">Altura(MT)</IonLabel>
              <IonInput type="number" onIonChange={(e:any) => setAltura(e.target.value)}></IonInput>
            </IonItem>
            <IonButton color="tertiary" id="imc-botao" onClick={()=>{calcularIMC()}}>Calcular</IonButton>
          </div>
          <Tabs children={user}/>
         
          
        </IonContent>
      </IonPage>
    );
  
};

export default IMC;
