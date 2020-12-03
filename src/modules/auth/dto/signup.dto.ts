import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export default class SignUpDTO {
    @IsNotEmpty({message: 'El nombre completo no puede estar vacio.'})
    @IsString({message: 'Se esperaba un texto.'})
    @MinLength(5,{message: 'El nombre completo es demasiado corto (<5).'})
    @MaxLength(65,{message: 'El nombre completo es demasiado largo (>65).'})
    fullname:string;

    @IsNotEmpty({message: 'El email no puede estar vacio.'})
    @IsString({message: 'Se esperaba un texto.'})
    @MinLength(5,{message: 'El email es demasiado corto (<5).'})
    @MaxLength(65,{message: 'El email es demasiado largo (>65).'})
    email:string;

    @IsNotEmpty({message: 'La contraseña no puede estar vacia.'})
    @IsString({message: 'Se esperaba un texto.'})
    @MinLength(6,{message: 'La contraseña es demasiada corta (<6).'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message:'La contraseña debe contener al menos 6 caracteres en el cual al menos debe haber una letra mayúscula, una minúscula y un número.'}
    )
    password:string;

}