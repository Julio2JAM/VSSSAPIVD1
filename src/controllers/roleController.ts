import { Request } from "express";
import { Like } from "typeorm";
import { Controller } from "../base/controller";
import { Role } from "../models/roleModel";
import { HTTP_STATUS } from "../base/globals";
import { ErrorResponse, handleError, NotFound } from "../base/errorHandle";

interface GetResponse{ 
    response: Role[];
    status: number; 
};

export class RoleController{

    async get(req: Request):Promise<GetResponse|ErrorResponse>{
        try {

            const where = {
                name        : req.query?.name && Like(`%${req.query.name}%`),
                code        : req.query?.code && Like(`%${req.query.code}%`),
                id_status   : req.query?.id_status
            }

            const controller = new Controller();
            const role = await controller.get(Role, {where});

            if(role.length == 0){
                throw new NotFound('Roles not found');
            }
            
            return {response: role, status: HTTP_STATUS.OK}
            
        } catch (error) {
            return handleError(error);
        }
    }

}