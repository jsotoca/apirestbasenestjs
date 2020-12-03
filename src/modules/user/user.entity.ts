import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude, classToPlain } from 'class-transformer';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { UserRoles } from "../auth/enums/user.roles";

@Entity('user')
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({nullable:false})
    fullname:string;

    @Column({default:'no_avatar.png'})
    avatar:string;

    @Column({nullable:false,unique:true})
    email:string;

    @Column({nullable:false})
    @Exclude({toPlainOnly:true})
    password:string;

    @Column({nullable:false,default:UserRoles.USER})
    role:UserRoles;

    @Column({nullable:false,default: ()=>true})
    actived:boolean;

    @CreateDateColumn({type:'timestamp',default:()=>'CURRENT_TIMESTAMP(6)'})
    created_at:Date;

    @CreateDateColumn({type:'timestamp',default:()=>'CURRENT_TIMESTAMP(6)',onUpdate:'CURRENT_TIMESTAMP(6)'})
    updated_at:Date;

    toJSON(){
        return classToPlain(this);
    }

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        if(this.password){
            const salt = genSaltSync(10);
            const passwordHash = hashSync(this.password,salt);
            this.password = passwordHash;
        }
    }

    comparePasswords(password:string){
        return compareSync(password,this.password);
    }
}