import React from 'react';
import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
  } from '@ionic/react';
import './Menu.css';
import { useLocation } from 'react-router';

const Menu: React.FC = () => {
   
    const location = useLocation() as any;
    return  (
        
        <IonMenu contentId="main" type="overlay">
          <IonContent>
            <IonList id="inbox-list">
              <IonListHeader>{location?.state?.user?.nome}</IonListHeader>
              <IonNote>{location?.state?.user?.email}</IonNote>
            </IonList>
            <IonList id="labels-list">
              <IonListHeader>Labels</IonListHeader>
            </IonList>
          </IonContent>
        </IonMenu>
      );

      
  };
  
  export default Menu;