import {Router} from 'express';
import { endPoint } from '../controller/apiController';
import { Validator} from '../dataValidator/dataValidator'
export const routes  =  Router()

routes.post("/register",Validator.register,endPoint.register);
routes.put("/deposito",Validator.deposito,endPoint.depoosito);
routes.get("/extrato/:ag/:conta",endPoint.extrato);
routes.post("/saque",Validator.saque,endPoint.saque);
routes.post("/login",Validator.login,endPoint.login)