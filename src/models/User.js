class User {
    
    constructor(tipo, nome, email, cpf, alunos=[], nutri=null, dieta=''){
        this.tipo=tipo;
        this.nome=nome;
        this.email=email;
        this.cpf=cpf;
        this.loggedUser=this;
        this.alunos=alunos;
        this.nutri=nutri;
        this.dieta=dieta;
    }
    
}

export default User;