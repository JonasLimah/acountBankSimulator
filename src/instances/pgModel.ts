import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../model/cliente';

export interface ClienteInterface extends Model{
    id: number,
    username:  string,
    password : string,
    token: string,
    saldo: number,
    ag: string,
    conta: string
}

export const Cliente = sequelize.define<ClienteInterface>("cliente",{
    id : {
        autoIncrement: true,
        primaryKey:true,
        type: DataTypes.NUMBER
    },
    username : {
        type:DataTypes.STRING
    },
    password : {
        type: DataTypes.STRING
    },
    token : {
        type : DataTypes.STRING
    },
    saldo :  { 
        type : DataTypes.NUMBER
    },
    ag: {
        type:DataTypes.STRING
    },
    conta: {
        type: DataTypes.STRING
    }

},
{
    timestamps: false,
    tableName : "cliente"
});