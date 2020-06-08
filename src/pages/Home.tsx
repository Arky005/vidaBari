import React, { useState } from 'react';
import { IonRouterOutlet, IonList, IonItem, IonMenu, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonTabs, IonIcon, IonTabBar, IonTabButton, IonLabel } from '@ionic/react';
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

const Home: React.FC = () => {
  const location = useLocation() as any;
  const state = useState() as any;
  const user = location?.state?.user;

  const [imcs, setImcs]:any = useState([]);
  const [data, setData]:any = useState([]);

  const atualizarGrafico = async() =>{
    const attimcs = await getIMC(user.email);
    console.log(attimcs)
    let points:any=[];
    for(let i=0; i<attimcs.length; i++){
      points.push({x: i, y: attimcs[i]})
    }
    setData([
      {									
          color: "steelblue", 
          points: points 
      }
    ])
    setImcs(attimcs);
  }

  atualizarGrafico();
  
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
            Evolução
            <div className="card-home">
            <LineChart 
                        width={300}
                        height={250}
                        data={data}
                    />
            
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
