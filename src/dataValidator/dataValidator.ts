import {checkSchema} from 'express-validator';

export const Validator = {
    register : checkSchema({
        username:{
            trim:true,
            isLength: {
                errorMessage: "campo não pode estar vazio",
                options:{min:2}
            }
        },
        password: {
            trim:true,
            isLength:{
                errorMessage:"A senha deve ter 6 digitos",
                options:{min: 6,max: 6 }
            }
        }
    }),
    deposito : checkSchema({
        ag:{
            trim:true,
            isLength:{
                errorMessage: "a agencia tem que conter 4 digitos",
                options:{min:4, max:4}
            }
        },
        conta:{
            trim:true,
            isLength:{
                errorMessage: "a conta tem que conter 5 digitos",
                options:{min:5, max:5}
            }
        },
        valor:{
            trim:true,
            isLength:{errorMessage:'valor invalido',options:{min:1}}
        },
        

    }),
    saque:checkSchema({
        ag:{
            trim:true,
            isLength:{errorMessage:"campo invalido",options:{min:4,max:4}}
        },
        conta:{
            trim:true,
            isLength:{errorMessage:"campo invalido",options:{min:5,max:5}}
        },
         valor:{
            trim:true,
            isLength:{errorMessage:"campo invalido",options:{min:1}}
        },
        password:{
            trim:true,
            isLength:{
                errorMessage:"campo invalido",
                options:{min:6,max:6}
            }
        }
    }),
    login: checkSchema({
        username : {
            trim: true,
            isLength:{
                errorMessage:"usuario ou senha invalido",
                options:{min:2}
            }
        },
        password : {
            trim: true,
            isLength:{
                errorMessage:"usuario ou senha invalido",
                options:{min:6,max:6}
            }
    }})
}