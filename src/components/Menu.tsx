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
import { logOutOutline, pencilOutline, addCircleOutline } from 'ionicons/icons';
import './Menu.css';
import { useLocation, useHistory } from 'react-router';
import { menuController } from "@ionic/core";


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
                <IonItem onClick={()=>{location.state.user=null; history.replace('/login')}} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" color="dark" icon={logOutOutline} />
                  <IonLabel>Sair</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </IonList>
            <IonList id="labels-list">
              { location?.state?.user?.tipo === 'usuario' ? 
               (<div>
                  <IonListHeader>Menu usuário</IonListHeader>
                  <IonItem onClick={()=>{history.replace('/imc', {user: location.state.user}); menuController.close()}} routerDirection="none" lines="none" detail={false}>
                    <IonIcon slot="start" color="dark" icon={logOutOutline} />
                    <IonLabel>Calculadora IMC</IonLabel>
                  </IonItem>
                </div>) 
              : 
              (<div>
                <IonListHeader>Menu nutricionista</IonListHeader>
                <IonItem onClick={()=>{history.replace('/cadastrar-aluno', {user: location.state.user}); menuController.close()}} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" color="dark" icon={addCircleOutline} />
                  <IonLabel>Cadastrar Aluno</IonLabel>
                </IonItem>
                <IonItem onClick={()=>{history.replace('/cadastrar-aluno', {user: location.state.user}); menuController.close()}} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" color="dark" icon={addCircleOutline} />
                  <IonLabel>Criar Planejamento</IonLabel>
                </IonItem>
                <IonItem onClick={()=>{history.replace('/imc', {user: location.state.user}); menuController.close()}} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" color="dark" icon={logOutOutline} />
                  <IonLabel>Calculadora IMC</IonLabel>
                </IonItem>
              </div>
              )}

            </IonList>
          </IonContent>
        </IonMenu>
      );

      
  };
  
  export default Menu;