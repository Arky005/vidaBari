import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonIcon } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Login.css';
import { logInOutline } from 'ionicons/icons';
import { loginUser } from '../firebaseConfig';
import {presentToast} from '../toast';

const Login: React.FC = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const entrar = async () => {
    const res = await loginUser(username, password);
    if(res){
        presentToast('logou')
    } else {
        presentToast('E-mail ou senha incorretos.');
    }
  }

  return (
    <IonPage>
      <IonContent color="primary">
        <div id="conteudo">

            <div id="logo">LOGO</div>
            <div id="logo">O #VidaBari ...</div>

            <div id="campos-login">
                <IonItem id="input-usuario">
                    <IonLabel position="floating">E-mail</IonLabel>
                    <IonInput onIonChange={(e:any) => setUsername(e.target.value)}></IonInput>
                </IonItem>
                <IonItem id="input-senha">
                    <IonLabel position="floating">Senha</IonLabel>
                    <IonInput type="password"  onIonChange={(e:any) => setPassword(e.target.value)}></IonInput>
                </IonItem>
                <IonButton id="botao-entrar" color="light" onClick={()=> entrar()}>
                    Entrar
                    <IonIcon slot="end" icon={logInOutline} />
                </IonButton>
            </div>

            <div id="cadastre-se">
                <span>Não tem uma conta? Cadastre-se!</span>
                <IonButton>Cadastrar-se</IonButton>
            </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
