import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonIcon, IonProgressBar, IonSelect, IonSelectOption } from '@ionic/react';
import './Cadastro.css';
import { logInOutline } from 'ionicons/icons';
import { loginUser } from '../firebaseConfig';
import {presentToast} from '../toast';
import logo from '../images/logomid.jpg'

const Cadastro: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [mostrarLoading, setMostrarLoading] = useState(false);
  const [tipoDeUsuario, setTipoDeUsuario] = useState('usuario');
  const [CPF, setCPF] = useState('');

  return (
    <IonPage>
      <IonContent color="primary">
        <div id="conteudo-cadastro">
            <div id="logo-cadastro">LOGO_PEQUENO</div>
            <div id="titulo-cadastro">Cadastro</div>

            <IonItem>
                <IonLabel position="floating">Tipo de conta</IonLabel>
                <IonSelect value={tipoDeUsuario} onIonChange={e => setTipoDeUsuario(e.detail.value)}>
                <IonSelectOption value="usuario">Usuário</IonSelectOption>
                <IonSelectOption value="nutri">Nutricionista</IonSelectOption>
                </IonSelect>
            </IonItem>
            <IonItem className="input-cadastro">
                <IonLabel position="floating">E-mail</IonLabel>
                <IonInput type="email" onIonChange={(e:any) => setEmail(e.target.value)}></IonInput>
            </IonItem>
            <IonItem className="input-cadastro">
                <IonLabel position="floating">CPF</IonLabel>
                <IonInput onIonChange={(e:any) => setCPF(e.target.value)}></IonInput>
            </IonItem>
            <IonItem className="input-cadastro">
                <IonLabel position="floating">Nome completo</IonLabel>
                <IonInput id="nome-cadastro" onIonChange={(e:any) => setNome(e.target.value)}></IonInput>
            </IonItem>
            <IonItem className="input-cadastro">
                <IonLabel position="floating">Senha</IonLabel>
                <IonInput type="password" onIonChange={(e:any) => setPassword(e.target.value)}></IonInput>
            </IonItem>
            <IonButton color="light">Efetuar cadastro</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Cadastro;
