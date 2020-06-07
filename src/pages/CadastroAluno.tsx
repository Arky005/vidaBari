import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonItem, IonLabel, IonButton, IonProgressBar, IonSelect, IonSelectOption, IonIcon } from '@ionic/react';
import './CadastroAluno.css';
import {  registerUser, mtoken } from '../firebaseConfig';
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
    const user = location?.state?.user;

  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [CPF, setCPF] = useState('');
  const history = useHistory();
 
  const cpfMask = (value:string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') 
  }

  return (
    <IonPage>
      <IonContent color="secondary">
        <div id="conteudo-cadastro">
    
            <div id="logo-cadastro"><img src={logo} width="100px" height="75px"/></div>
            <div id="titulo-cadastro">Cadastro de aluno</div>

            O aluno deve estar cadastrado no aplicativo. Insira o e-mail do aluno abaixo:
            <IonItem color="light" className="input-cadastro">
                <IonLabel position="floating">E-mail</IonLabel>
                <IonInput type="email" onIonChange={(e:any) => setEmail(e.target.value)}></IonInput>
            </IonItem>
            
    
            <IonButton color="tertiary" onClick={()=>{}}>Cadastrar Aluno</IonButton>
        </div>
        <Tabs children={user}/> 
      </IonContent>
    </IonPage>
  );
};

export default CadastroAluno;
