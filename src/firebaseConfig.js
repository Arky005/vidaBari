import * as firebase from 'firebase';
import User from './models/User';
import { presentToast } from './toast';

var config = {
    apiKey: "AIzaSyD7wNIAe_UMlHwtNLENBM6k6DqKrmevjTU",
    authDomain: "pi2020-48145.firebaseapp.com",
    databaseURL: "https://pi2020-48145.firebaseio.com",
    projectId: "pi2020-48145",
    storageBucket: "pi2020-48145.appspot.com",
    messagingSenderId: "238980212705",
    appId: "1:238980212705:web:18f9f7ffe2978689f0d4a0",
    measurementId: "G-MX03X7R1MD"
  };

firebase.initializeApp(config);

export async function loginUser(email, pass){
    try {
        await firebase.auth().signInWithEmailAndPassword(email, pass);
        return true;
    } catch(error) {
        return false;
    }
};

export async function registerUser(email, pass, nome, cpf, tipo) {
    try {
        const id = email.replace(/\./g, '_dot_')
        await firebase.database().ref('users/'+id).set({
            email,
            nome,
            cpf,
            tipo
        });
        await firebase.auth().createUserWithEmailAndPassword(email, pass);
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

export function mtoken () {
    presentToast(firebase.messaging().getToken());
}

export async function getUser(email){
    try {
        const id = email.replace(/\./g, '_dot_');
        let dados;
       
        await firebase.database().ref('users/'+id).once('value', (snapshot)=>{
            dados = snapshot.val();
        });
        return new User(dados.tipo, dados.nome, dados.email, dados.cpf);
        
    } catch(error){
        console.log(error);
        return null;
    }
}

export async function cadastrarAluno(user, emailAluno){
    
}


  