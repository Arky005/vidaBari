import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle id="titulo">Bem-vindo(a) ao #vidaBari!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="primary">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">...</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
