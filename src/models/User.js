class User {
    
    constructor(tipo, nome, email, cpf){
        this.tipo=tipo;
        this.nome=nome;
        this.email=email;
        this.cpf=cpf;
        this.loggedUser=this;
    }
    
}

export default User;