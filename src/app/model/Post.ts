import { Usuario } from './Usuario';
import { Comentario } from './Comentario';

export class Post{

    public idPostagem: number;
    public texto: string;
    public dataInclusao: string;
    public imagem: string;
    public usuario: Usuario;
    public comentarios: Comentario;
}