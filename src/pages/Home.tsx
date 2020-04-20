import React, { useState } from 'react';
import { IonList, IonItem, IonMenu, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonMenuButton, IonButtons } from '@ionic/react';
import './Home.css';
import { useLocation, useHistory } from 'react-router';
import logo from '../images/logo2.png'
import Menu from '../components/Menu'

const Home: React.FC = () => {
  const location = useLocation() as any;
  const {user} = location.state;
  
  return (
    
    <IonPage>
      
      <IonHeader>
        <IonToolbar color="light">
        <IonButtons slot="start">
            <IonMenuButton id="botao-menu"/>
          </IonButtons>
          <div id="bar-home">
          
            <img src={logo} width="40px" height="40px"/>
            <span id="titulo-home"><i>Olá, {user.nome.split(' ')[0]}!</i></span>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent color="secondary">
     
      </IonContent>
    </IonPage>
  );
};

export default Home;
