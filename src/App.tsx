import React from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonSplitPane
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Home from './pages/Home';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import IMC from './pages/IMC'
import { Plugins } from '@capacitor/core';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';


/* Theme variables */
import './theme/variables.css';
import Menu from './components/Menu';
import CadastroAluno from './pages/CadastroAluno';
import HomeNutri from './pages/HomeNutri';
import VerAlunos from './pages/VerAlunos';
import Dicas from './pages/Dicas';
import Voce from './pages/Voce';
const { SplashScreen } = Plugins;

const App: React.FC = () => {

  // Hide the splash (you should do this on app launch)
  SplashScreen.hide();

  return (
  <IonApp>
    <IonReactRouter>
      <Menu />
      <IonRouterOutlet id="main">
          <Route path="/imc" component={IMC} />
          <Route path="/home" component={Home} exact={true} />
          <Route path="/tab2" component={Tab2} />
          <Route path="/tab3" component={Tab3} />
          <Route path="/cadastro" component={Cadastro} />
          <Route path="/cadastrar-aluno" component={CadastroAluno} />
          <Route path="/ver-alunos" component={VerAlunos} />
          <Route path="/home-nutri" component={HomeNutri} exact={true} />
          <Route path="/dicas" component={Dicas} exact={true} />
          <Route path="/voce" component={Voce} exact={true} />
          <Route path="/login" component={Login} />
          <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  )};

export default App;
