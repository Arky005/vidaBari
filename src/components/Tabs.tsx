import { useLocation, useHistory } from 'react-router';
import {IonTabButton, IonTabs, IonRouterOutlet, IonTabBar, IonLabel, IonIcon, IonButton} from '@ionic/react';
import { heartHalfOutline, personCircleOutline, triangleOutline } from 'ionicons/icons';
import {  Route } from 'react-router-dom';
import React, { useState } from 'react';
import Home from '../pages/Home'
import { presentToast } from '../toast';
import './Tabs.css';

const Tabs: React.FC = () => {
    const history = useHistory();
    const location = useLocation() as any;
    const user = location.state?.user;
    
     return  (
         <div id="tabs-container">
            <div className="tab-button" onClick={()=>history.replace('/home', {user})}>
                <IonIcon  icon={personCircleOutline}/>
                <span className="tab-title">Acompanhamento</span>
            </div>
            <div className="tab-button" onClick={()=>history.replace('/perfil', {user})}>
                <IonIcon  icon={heartHalfOutline}/>
                <span className="tab-title">Você</span>
            </div>
            <div className="tab-button" onClick={()=>history.replace('/dicas', {user})}>
                <IonIcon  icon={triangleOutline}/>
                <span className="tab-title">Dicas</span>
            </div>
        </div>
    
     
       );
 
       
   };
   
   export default Tabs;