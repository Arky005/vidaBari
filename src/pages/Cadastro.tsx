import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonIcon, IonProgressBar, IonSelect, IonSelectOption } from '@ionic/react';
import './Cadastro.css';
import { logInOutline } from 'ionicons/icons';
import { loginUser, registerUser } from '../firebaseConfig';
import {presentToast} from '../toast';
import logo from '../images/logo.png'
import { useHistory } from 'react-router';

const Cadastro: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [mostrarLoading, setMostrarLoading] = useState(false);
  const [tipoDeUsuario, setTipoDeUsuario] = useState('usuario');
  const [CPF, setCPF] = useState('');
  const history = useHistory();

  const efetuarCadastro = async() => {

    try{

      if( !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)) ) 
        throw new Error('E-mail inválido.');

      if( !(/^[0-9]*$/.test(CPF) && CPF.length==11) )
        throw new Error('CPF inválido!');

      if( !(nome.length>5 && /^[a-zA-Zà-úÀ-Ú\s]*$/.test(nome)) )
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

  }

  return (
    <IonPage>
      <IonContent color="light">
        <div id="conteudo-cadastro">
            <div id="logo-cadastro"><img src={logo}/></div>
            <div id="titulo-cadastro">Cadastro</div>

            <IonItem color="secondary">
                <IonLabel position="floating">Tipo de conta</IonLabel>
                <IonSelect value={tipoDeUsuario} onIonChange={e => setTipoDeUsuario(e.detail.value)}>
                <IonSelectOption value="usuario">Usuário</IonSelectOption>
                <IonSelectOption value="nutri">Nutricionista</IonSelectOption>
                </IonSelect>
            </IonItem>
            <IonItem color="secondary" className="input-cadastro">
                <IonLabel position="floating">E-mail</IonLabel>
                <IonInput type="email" onIonChange={(e:any) => setEmail(e.target.value)}></IonInput>
            </IonItem>
            <IonItem color="secondary" className="input-cadastro">
                <IonLabel position="floating">CPF</IonLabel>
                <IonInput onIonChange={(e:any) => setCPF(e.target.value)}></IonInput>
            </IonItem>
            <IonItem color="secondary" className="input-cadastro">
                <IonLabel position="floating">Nome completo</IonLabel>
                <IonInput id="nome-cadastro" onIonChange={(e:any) => setNome(e.target.value)}></IonInput>
            </IonItem>
            <IonItem color="secondary" className="input-cadastro">
                <IonLabel position="floating">Senha</IonLabel>
                <IonInput type="password" onIonChange={(e:any) => setPassword(e.target.value)}></IonInput>
            </IonItem>
            <IonButton color="tertiary" onClick={()=>efetuarCadastro()}>Efetuar cadastro</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Cadastro;
