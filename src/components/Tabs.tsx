import { useLocation, useHistory } from 'react-router';
import {IonTabButton, IonTabs, IonRouterOutlet, IonTabBar, IonLabel, IonIcon} from '@ionic/react';
import { heartHalfOutline, personCircleOutline, triangleOutline } from 'ionicons/icons';
import {  Route } from 'react-router-dom';
import React, { useState } from 'react';
import Home from '../pages/Home'

const Tabs: React.FC = (props) => {
    const history = useHistory();
     const location = useLocation() as any;
     console.log(props.children);
     return  (
         
        <IonTabs>
            <IonRouterOutlet>
                
                
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
            <IonTabButton >
                <IonIcon  icon={personCircleOutline}/>
                <IonLabel>Você</IonLabel>
            </IonTabButton>
            <IonTabButton >
                <IonIcon icon={heartHalfOutline} />
                <IonLabel>Acompanhamento</IonLabel>
            </IonTabButton>
            <IonTabButton >
                <IonIcon icon={triangleOutline} />
                <IonLabel>Dicas</IonLabel>
            </IonTabButton>
            </IonTabBar>
    
      </IonTabs>
       );
 
       
   };
   
   export default Tabs;