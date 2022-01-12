export interface rol {
    adminGeneral: boolean;
    estudiante: boolean;

}


export interface UsuarioModel{
    id: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    password : string;
    status : boolean;
    email: string;
    course    : string; 
    age   : number;
    birthDate: string
    imagen: string;
    userId: string;
    rol: rol;
}