import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonItem, IonLabel, IonButton, IonProgressBar, IonSelect, IonSelectOption, IonIcon, useIonViewWillEnter } from '@ionic/react';
import './Cadastro.css';
import {  registerUser} from '../firebaseConfig';
import {presentToast} from '../toast';
import logo from '../images/logo.png'
import { useHistory } from 'react-router';
import { arrowBack } from 'ionicons/icons';
import { Plugins } from "@capacitor/core";
import { FCM } from "capacitor-fcm";

const Cadastro: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [mostrarLoading, setMostrarLoading] = useState(false);
  const [tipoDeUsuario, setTipoDeUsuario] = useState('usuario');
  const [CPF, setCPF] = useState('');
  const history = useHistory();

  useIonViewWillEnter(()=>{
    setEmail('');
    setCPF('');
    setNome('');
    setPassword('');

  })

  const cpfMask = (value:string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') 
  }

  const efetuarCadastro = async() => {
    setMostrarLoading(true);
    try{

      if( !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)) ) 
        throw new Error('E-mail inválido.');

      const numbersCPF = CPF.replace(/\D/g, '');
      if( !(/^[0-9]*$/.test(numbersCPF) && numbersCPF.length==11) )
        throw new Error('CPF inválido!');

      if( !(nome.length>5 && /^[a-zA-Zà-úÀ-Ú\s]*$/.test(nome)) || !nome.includes(' ') || nome.indexOf(' ')===0 )
        throw new Error('Nome inválido.');

      if( password.length < 6 )
        throw new Error('Senha deve conter pelo menos 6 caracteres.');

      if( !await registerUser(email, password, nome, CPF, tipoDeUsuario))
        throw new Error('Erro ao registrar.')

      presentToast('Cadastrado com sucesso!');
      history.push('/login');
    } catch(error) {
      presentToast(error.message);
    }
    setMostrarLoading(false);
  }

  return (
    <IonPage>
      <IonContent color="secondary">
        <div id="conteudo-cadastro">
            <IonIcon icon={arrowBack} onClick={()=>history.push('/login')} color="dark"/>
            <div id="logo-cadastro"><img src={logo} width="100px" height="75px"/></div>
            <div id="titulo-cadastro">Cadastro</div>

            <IonItem color="light">
                <IonLabel position="floating">Tipo de conta</IonLabel>
                <IonSelect value={tipoDeUsuario} onIonChange={e => setTipoDeUsuario(e.detail.value)}>
                <IonSelectOption value="usuario">Usuário</IonSelectOption>
                <IonSelectOption value="nutri">Nutricionista</IonSelectOption>
                </IonSelect>
            </IonItem>
            <IonItem color="light" className="input-cadastro">
                <IonLabel position="floating">E-mail</IonLabel>
                <IonInput value={email} type="email" onIonChange={(e:any) => setEmail(e.target.value)}></IonInput>
            </IonItem>
            <IonItem color="light" className="input-cadastro">
                <IonLabel position="floating">CPF</IonLabel>
                <IonInput value={CPF} onIonChange={(e:any) => setCPF(cpfMask(e.target.value))}></IonInput>

            </IonItem>
            <IonItem color="light" className="input-cadastro">
                <IonLabel position="floating">Nome completo</IonLabel>
                <IonInput value={nome} id="nome-cadastro" onIonChange={(e:any) => setNome(e.target.value)}></IonInput>
            </IonItem>
            <IonItem color="light" className="input-cadastro">
                <IonLabel position="floating">Senha</IonLabel>
                <IonInput value={password} type="password" onIonChange={(e:any) => setPassword(e.target.value)}></IonInput>
            </IonItem>
            <div id="loading-login">{(mostrarLoading ? <IonProgressBar type="indeterminate" color="medium"></IonProgressBar> : '')}</div>
            <IonButton color="tertiary" onClick={()=>efetuarCadastro()}>Efetuar cadastro</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Cadastro;
