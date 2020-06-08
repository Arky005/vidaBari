import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonItem, IonLabel, IonButton, IonProgressBar, IonSelect, IonSelectOption, IonIcon } from '@ionic/react';
import './CadastroAluno.css';
import {  registerUser, cadastrarAluno, getUser } from '../firebaseConfig';
import {presentToast} from '../toast';
import logo from '../images/logo.png'
import { useHistory, useLocation } from 'react-router';
import { arrowBack } from 'ionicons/icons';
import { Plugins } from "@capacitor/core";
import { FCM } from "capacitor-fcm";
import Tabs from '../components/Tabs'


const CadastroAluno: React.FC = () => {

  const location = useLocation() as any;
  const state = useState() as any;
  let user = location?.state?.user;

  const [email, setEmail] = useState('');
  const history = useHistory();

  const efetuarCadastro = async() =>{
    presentToast('Aluno cadastrado com sucesso!');
    cadastrarAluno(user.email, email);
    user = await getUser(user.email);
    history.replace('/home-nutri', {user});
  }
  

  return (
    <IonPage>
      <IonContent color="secondary">
        <div id="conteudo-cadastro">
    
            <IonIcon icon={arrowBack} onClick={()=>history.push('/home-nutri', {user})} color="dark"/>
            <div id="logo-cadastro"><img src={logo} width="100px" height="75px"/></div>
            <div id="titulo-cadastro">Cadastro de aluno</div>

            O aluno deve estar cadastrado no aplicativo. Insira o e-mail do aluno abaixo:
            <IonItem color="light" className="input-cadastro">
                <IonLabel position="floating">E-mail</IonLabel>
                <IonInput type="email" onIonChange={(e:any) => setEmail(e.target.value)}></IonInput>
            </IonItem>
    
            <IonButton color="tertiary" onClick={()=>{efetuarCadastro()}}>Cadastrar Aluno</IonButton>
        </div>
        <Tabs children={user}/> 
      </IonContent>
    </IonPage>
  );
};

export default CadastroAluno;
