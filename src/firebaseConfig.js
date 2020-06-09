import * as firebase from 'firebase';
import User from './models/User';
import { presentToast } from './toast';
const moment = require('moment');

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
const database = firebase.database();
const auth = firebase.auth();

export async function loginUser(email, pass){
    try {
        await auth.signInWithEmailAndPassword(email, pass);
        return true;
    } catch(error) {
        return false;
    }
};

export async function registerUser(email, pass, nome, cpf, tipo) {
    try {
        const id = email.replace(/\./g, '_dot_')
        await database.ref('users/'+id).set({
            email,
            nome,
            cpf,
            tipo
        });
        await auth.createUserWithEmailAndPassword(email, pass);
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

export async function getUser(email){
    try {
        const id = email.replace(/\./g, '_dot_');
        let dados;
       
        await database.ref('users/'+id).once('value', (snapshot)=>{
            dados = snapshot.val();
        });
        return new User(dados.tipo, dados.nome, dados.email, dados.cpf, dados.alunos, dados.nutri, dados.dieta);
        
    } catch(error){
        console.log(error);
        return null;
    }
}



export async function cadastrarAluno(email, emailAluno){
    const idNutri = email.replace(/\./g, '_dot_');
    const idAluno = emailAluno.replace(/\./g, '_dot_');
    let alunos = [];
    database.ref('users/'+idNutri+'/alunos').once('value', (snapshot)=>{
        if(snapshot.val())
            alunos = snapshot.val();
    }).then(()=>{
        database.ref('users/'+idNutri).child('alunos').set([...alunos, emailAluno]);
        database.ref('users/'+idAluno).child('nutri').set(email);
    });
}

export async function cadastrarDieta(emailAluno, dieta){
    const idAluno = emailAluno.replace(/\./g, '_dot_');
    database.ref('users/'+idAluno).child('dieta').set(dieta);
}

export async function getDieta(emailAluno){
    const idAluno = emailAluno.replace(/\./g, '_dot_');
    let resp = '';
    await database.ref('users/'+idAluno).child('dieta').once('value', (snapshot)=>{
        if(snapshot.val())
            resp = snapshot.val();
    });
    return resp;
}

export async function cadastrarIMC(emailAluno, valor){
    const idAluno = emailAluno.replace(/\./g, '_dot_');
    let imcs = {};
    database.ref('users/'+idAluno+'/imcs').once('value', (snapshot)=>{
        if(snapshot.val())
            imcs = snapshot.val();
    }).then(()=>{
        const key = moment().format('YYYY-MM-DD');
        const newIMC = {...imcs};
        newIMC[key] = valor;
        database.ref('users/'+idAluno).child('imcs').set(newIMC);
    });
}

export async function getIMC(emailAluno){
    let imcs = {};
    const idAluno = emailAluno.replace(/\./g, '_dot_');
    await database.ref('users/'+idAluno+'/imcs').once('value', (snapshot)=>{
        if(snapshot.val())
            imcs = snapshot.val();
    });
    return imcs;
}



  