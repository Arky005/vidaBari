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
import { logOutOutline } from 'ionicons/icons';
import './Menu.css';
import { useLocation, useHistory } from 'react-router';

const Menu: React.FC = () => {
   const history = useHistory();
    const location = useLocation() as any;
    return  (
        
        <IonMenu contentId="main" type="overlay">
          <IonContent>
            <IonList id="inbox-list">
              <IonListHeader>{location?.state?.user?.nome}</IonListHeader>
              <IonNote>{location?.state?.user?.email}</IonNote>
              <IonMenuToggle key="0" autoHide={false}>
                <IonItem onClick={()=>history.push('/login')} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" color="dark" icon={logOutOutline} />
                  <IonLabel>Sair</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </IonList>
            <IonList id="labels-list">
              { location?.state?.user?.tipo === 'usuario' ? 
               (<div>
                  <IonListHeader>Menu usuário</IonListHeader>
                </div>) 
              : 
              (<div>
                <IonListHeader>Menu nutricionista</IonListHeader>
              </div>
              )}

            </IonList>
          </IonContent>
        </IonMenu>
      );

      
  };
  
  export default Menu;