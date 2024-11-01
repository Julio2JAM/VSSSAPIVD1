import { Request } from "express";
import { Like } from "typeorm";
import { Controller } from "../base/controller";
import { HTTP_STATUS } from "../base/globals";
import { BadRequest, ErrorResponse, handleError, NotFound } from "../base/errorHandle";
import { User } from "../models/userModel";

interface GetResponse{ 
    response: User[];
    status: number; 
};

interface PostPutResponse{
    response: {
        user:User,
        message:string
    }
    status: number; 
}

export class UserController{

    async get(req: Request):Promise<GetResponse|ErrorResponse>{
        try {

            const where = {
                email       : req.query?.email && Like(`%${req.query.email}%`),
                id_role     : req.query?.id_role,
                id_status   : req.query?.id_status
            }

            const controller = new Controller();
            const user = await controller.get(User, where);

            if(user.length == 0){
                throw new NotFound('Users not found');
            }
            
            return {response: user, status: HTTP_STATUS.OK}
            
        } catch (error) {
            return handleError(error);
        }
    }
    
    async login(req: Request):Promise<PostPutResponse|ErrorResponse>{
        try {

            const where = {
                email       : req.body.email,
                password    : req.body.password,
            }

            const controller = new Controller();
            const user = await controller.get(User, where);

            if(user.length == 0){
                throw new BadRequest('Credenciales incorrectas.');
            }
            
            const response = {
                user:user[0],
                message:"Inicio de sesion exitoso.",
                status: HTTP_STATUS.CREATED
            }
            return {response, status: HTTP_STATUS.OK}
            
        } catch (error) {
            return handleError(error);
        }
    }

    async post(req: Request):Promise<PostPutResponse|ErrorResponse> {
        try {

            const { password, email, id_role } = req.body;
            const controller = new Controller();

            const validateEmail = await controller.get(User, {email});

            if(validateEmail){
                throw new BadRequest("Email ya registrado.");
            }

            const user = new User();
            user.email = email;
            user.password = password;
            user.role = id_role;

            const newUser = await controller.upsert(User, user) as User;
            const response = {
                user:newUser,
                message:"Usuario creado.",
                status: HTTP_STATUS.CREATED
            }
            return {response, status: HTTP_STATUS.CREATED}

        } catch (error) {
            return handleError(error);
        }
    };

    async put(req: Request):Promise<PostPutResponse|ErrorResponse> {
        try {
            
            const controller = new Controller();
            let user = await controller.getById(User, req.body.id);
        
            if (!user) {
                throw new BadRequest('Users not found');
            }
      
            user = Object.assign(user, req.body);
            const userUpdated = await controller.upsert(User, user) as User;
        
            const response = {
                user:userUpdated,
                message:"Usuario actualizado.",
                status: HTTP_STATUS.CREATED
            }
            return {response, status: HTTP_STATUS.CREATED}

        } catch (error) {
            return handleError(error);
        }
    };
}