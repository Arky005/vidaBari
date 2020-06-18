import React, { useState } from 'react';
import { IonRouterOutlet, IonList, IonItem, IonMenu, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonTabs, IonIcon, IonTabBar, IonTabButton, IonLabel, useIonViewWillEnter } from '@ionic/react';
import './HomeNutri.css';
import { useLocation, useHistory } from 'react-router';
import logo from '../images/logo2.png'
import Menu from '../components/Menu';
import { happy } from 'ionicons/icons';
import {  Route } from 'react-router-dom';
import Tabs from '../components/Tabs'
import User from '../models/User';
import { getUser } from '../firebaseConfig';

const HomeNutri: React.FC = () => {
  const location = useLocation() as any;
  const state = useState() as any;
  const user = location?.state?.user;
  
  useIonViewWillEnter(async ()=>{
    location.state.user = await getUser(user.email);
  })

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
          <div id="conteudo-home-container2">
            Suas estatísticas
            <div className="card-home2">
              Quantidade de alunos: {user.alunos.length}
            </div>
            Seus dados
            <div className="card-home2">
                Nome: {user?.nome}<br></br>
                E-mail: {user?.email}
            </div>
            

          </div>

          <Tabs children={user}/>
          
        </IonContent>
      </IonPage>
    );
  else 
    return(<div>deu ruim brother</div>);
};

export default HomeNutri;
