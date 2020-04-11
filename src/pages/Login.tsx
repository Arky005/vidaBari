import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonIcon, IonProgressBar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Login.css';
import { logInOutline } from 'ionicons/icons';
import { loginUser } from '../firebaseConfig';
import {presentToast} from '../toast';
import logo from '../images/logomid.jpg'
import { Redirect, Route, Link } from 'react-router-dom';

const Login: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarLoading, setMostrarLoading] = useState(false);

  const entrar = async () => {
    setMostrarLoading(true);
    const res = await loginUser(email, password);
    if(res){
        presentToast('logou')
    } else {
        presentToast('E-mail ou senha incorretos.');
    }
    setMostrarLoading(false);
  }

  return (
    <IonPage>
      <IonContent color="primary">
        <div id="conteudo-login">

            <div id="logo-login">LOGO_MEDIO</div>
            <div id="descricao-login">O #VidaBari ...</div>

            <div id="campos-login">
                <IonItem id="input-usuario-login">
                    <IonLabel position="floating">E-mail</IonLabel>
                    <IonInput onIonChange={(e:any) => setEmail(e.target.value)}></IonInput>
                </IonItem>
                <IonItem id="input-senha-login">
                    <IonLabel position="floating">Senha</IonLabel>
                    <IonInput type="password"  onIonChange={(e:any) => setPassword(e.target.value)}></IonInput>
                </IonItem>
                <div id="loading-login">{(mostrarLoading ? <IonProgressBar type="indeterminate" color="light"></IonProgressBar> : '')}</div>
                <IonButton id="botao-entrar-login" color="light" onClick={()=> entrar()}>
                    Entrar
                    <IonIcon slot="end" icon={logInOutline} />
                </IonButton>
            </div>

            <div id="cadastre-se-login">
                <span>Não tem uma conta? Cadastre-se!</span>
                <Link to="/cadastro"> 
                  <IonButton color="light" id="botao-cadastro-login">Cadastrar-se</IonButton>
                </Link>
            </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
