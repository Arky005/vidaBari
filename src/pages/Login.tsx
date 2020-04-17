import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonIcon, IonProgressBar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Login.css';
import { logInOutline } from 'ionicons/icons';
import { loginUser } from '../firebaseConfig';
import {presentToast} from '../toast';
import logo from '../images/logomid.png'
import { Redirect, Route, Link, useHistory } from 'react-router-dom';


const Login: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarLoading, setMostrarLoading] = useState(false);
  const history = useHistory();

  const entrar = async () => {
    setMostrarLoading(true);
    const res = await loginUser(email, password);
    if(res){
       //presentToast('logou')
      history.push('/tab1');
    } else {
        presentToast('E-mail ou senha incorretos.');
    }
    setMostrarLoading(false);
  }

  return (
    <IonPage>
      <IonContent color="light">
        <div id="conteudo-login">

            <div id="logo-login"><img src={logo}/></div>
            <div id="descricao-login"><i>O #VidaBari ajuda a manter sua vida saudável, fornecendo diversas funções para
              acompanhar sua evolução!</i></div>

            <div id="campos-login">
                <IonItem color="secondary" id="input-usuario-login">
                    <IonLabel position="floating">E-mail</IonLabel>
                    <IonInput onIonChange={(e:any) => setEmail(e.target.value)}></IonInput>
                </IonItem>
                <IonItem color="secondary" id="input-senha-login">
                    <IonLabel position="floating">Senha</IonLabel>
                    <IonInput type="password"  onIonChange={(e:any) => setPassword(e.target.value)}></IonInput>
                </IonItem>
                <div id="loading-login">{(mostrarLoading ? <IonProgressBar type="indeterminate" color="medium"></IonProgressBar> : '')}</div>
                <IonButton id="botao-entrar-login" color="tertiary" onClick={()=> entrar()}>
                    Entrar
                    <IonIcon slot="end" icon={logInOutline} />
                </IonButton>
            </div>

            <div id="cadastre-se-login">
                <span>Não tem uma conta? Cadastre-se!</span>
                <Link to="/cadastro"> 
                  <IonButton color="tertiary" id="botao-cadastro-login">Cadastrar-se</IonButton>
                </Link>
            </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
