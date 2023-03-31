import { Request,Response } from "express";
import { Cliente} from "../instances/pgModel";
import jwt from "jsonwebtoken";
import {validationResult,matchedData} from "express-validator"
import {Boost} from '../BoostApp/Functions/BoostFunctions'

export const endPoint = {
    register : async (req:Request,res:Response) => {
        let error = validationResult(req);
        let data =  matchedData(req);
        if(!error.isEmpty()){
            res.json({error:error.mapped()});
            return;
        };
        let newUser;
        let user = await Cliente.findOne({where:{username:data.username}})
        if(!user){
            let ag = Math.floor(Math.random()*1000)*4;
            let conta = Math.floor(Math.random()*10000)*5;
            let token = jwt.sign({username:data.username},process.env.JWT_TOKEN as string)
            newUser = {
                username : data.username,
                password: data.password,
                ag,
                conta,
                token
            }
            await Cliente.create(newUser);
            res.json({status:201});
            return;
        }
        res.json({error: "try another account"})
    },
    depoosito : async (req:Request,res:Response)=>{
        let data =  matchedData(req);
        let error =  validationResult(req);
        if(!error.isEmpty()){
            res.json({error: error.mapped()});
            return;
        };
        let user =  await Cliente.findOne({where:{ag:data.ag,conta:data.conta}});
        if(user){
            let verify = Boost.VerifySing(data.valor);
            if(verify === -1||verify === -0||verify === 0){
                res.json({message:"valor invalido"});
                return;
            }
            let setSaldoNumber = Boost.changeValue(user.saldo.toString());
            let setDataValue = Boost.changeValue(data.valor);
            console.log(typeof setDataValue,typeof setSaldoNumber)
            if(setDataValue>0){
                
            user.saldo = setSaldoNumber+setDataValue
            user.save()
            res.json({message: `seu deposito de ${data.valor}R$ foi realizado com sucesso para ${user.username}!`})
            return;};
            res.json({error: "valor invalido"})
        };
        res.json({error: "ag/conta invalida"})
    },
    extrato : async (req:Request,res:Response)=>{
        let {ag,conta} = req.params
        let extrato = await Cliente.findOne({where:{ag,conta}})
        res.json({extrato})
    },
    saque : async (req:Request,res:Response)=>{
        let data = matchedData(req);
        let error = validationResult(req);
        if(!error.isEmpty()){
            res.json({error: error.mapped()});
            return;
        };
        let searchAccount = await Cliente.findOne({where:{ag:data.ag,conta:data.conta,password:data.password}});
        if(searchAccount){
            let limite =  Boost.changeValue(searchAccount.saldo.toString());
            let saque = Boost.changeValue(data.valor);
            let verifySaque = Boost.VerifySing(saque);
            if(verifySaque === -1){
                res.json({message:"saldo insuficiente"});
                return;
            }
            if(limite >= saque){
            searchAccount.saldo = (limite-saque);//bug no saque
            searchAccount.save();
            res.json({message:"Seu saque foi realizado com sucesso"})
            return;
            };
            res.json({error:'Saldo Insuficiente,Reveja seu extrato'})
        };
       

    }
}