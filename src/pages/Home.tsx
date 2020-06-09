import React, { useState } from 'react';
import { IonRouterOutlet, IonList, IonItem, IonMenu, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonTabs, IonIcon, IonTabBar, IonTabButton, IonLabel, useIonViewWillEnter } from '@ionic/react';
import './Home.css';
import { useLocation, useHistory } from 'react-router';
import logo from '../images/logo2.png'
import Menu from '../components/Menu';
import { happy } from 'ionicons/icons';
import {  Route } from 'react-router-dom';
import Tabs from '../components/Tabs'
import User from '../models/User';
import LineChart from 'react-linechart';
import { getIMC } from '../firebaseConfig';
import { Chart } from 'react-charts'
const moment = require('moment');


const Home: React.FC = () => {
  const location = useLocation() as any;
  const state = useState() as any;
  const user = location?.state?.user;

  //const [imcs, setImcs]:any = useState([]);
  const [data, setData]:any = useState(null);

  const atualizarGrafico = async() =>{
    const attimcs = await getIMC(user.email);
    let points:any=[];

    Object.keys(attimcs).forEach((key)=>{
      points.push([moment(key).format('DD/MM'), attimcs[key]])
    })
    
    setData([
      {					
        data: points
      }
    ])
  }
    
    useIonViewWillEnter(()=>{
      atualizarGrafico();
    })
   
    const axes = [
        { primary: true, type: 'ordinal', position: 'bottom' },
        { type: 'linear', position: 'left' }
    ];

  if(user)
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="light">
          <IonButtons slot="start">
              <IonMenuButton id="botao-menu"/>
            </IonButtons>
            <div id="bar-home">
              <img src={logo} width="40px" height="40px"/>
              <span id="titulo-home"><i>Olá, {user?.nome?.split(' ')[0]}!</i></span>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent color="secondary">
          <div id="conteudo-home-container">
            Histórico de IMC
            <div className="card-home">
              <div id="imc-chart-container">
                {data? <Chart data={data} axes={axes} /> : ''}
              </div>
            </div>
           <div className="card-home" id="cartao-dias">
              <div id="cartao-dias-container">
              <span>Em acompanhamento há 12 dias.</span>
              <IonIcon icon={happy} color="primary" id="icone-frase"></IonIcon>
              <span>Continue assim! Perseverança é a chave!</span>
              </div>
            </div>

          </div>

          <Tabs children={user}/>
          
        </IonContent>
      </IonPage>
    );
  else 
    return(<div>deu ruim brother</div>);
};

export default Home;
