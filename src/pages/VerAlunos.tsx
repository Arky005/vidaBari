import React, { useState } from 'react';
import { IonRouterOutlet, IonList, IonItem, IonAlert, IonMenu, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonTabs, IonIcon, IonTabBar, IonTabButton, IonLabel } from '@ionic/react';
import './VerAlunos.css';
import { useLocation, useHistory } from 'react-router';
import logo from '../images/logo2.png'
import Menu from '../components/Menu';
import { happy } from 'ionicons/icons';
import {  Route } from 'react-router-dom';
import Tabs from '../components/Tabs'
import User from '../models/User';
import { cadastrarDieta } from '../firebaseConfig';
import { presentToast } from '../toast';

const VerAlunos: React.FC = () => {
  const location = useLocation() as any;
  const state = useState() as any;
  const user = location?.state?.user;
  console.log(user);

  const [showAlert, setShowAlert] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState('');
  
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
          <div id="conteudo-home-container4">
          ALUNOS
            <div className="card-home4">
                {user.alunos.map((element, index) => {
                  return (<IonItem onClick={()=>{setShowAlert(true); setAlunoSelecionado(element)}} key={index}>{element}</IonItem>)
                })}
            </div>
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            cssClass='my-custom-class'
            header={'Dieta do aluno'}
            inputs={[
              {
                name: 'dieta',
                type: 'text',
                placeholder: 'Dieta'
              }
            ]}
            buttons={[
              {
                text: 'Cancelar',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                  console.log('Confirm Cancel');
                }
              },
              {
                text: 'Ok',
                handler: (resp) => {
                  cadastrarDieta(alunoSelecionado, resp.dieta);
                  presentToast('Dieta de '+alunoSelecionado+ ' atualizada')
                }
              }
            ]}
          />

          </div>

          <Tabs children={user}/>
          
        </IonContent>
      </IonPage>
    );
  else 
    return(<div>deu ruim brother</div>);
};

export default VerAlunos;
