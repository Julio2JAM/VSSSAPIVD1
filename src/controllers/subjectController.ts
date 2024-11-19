import { Request } from "express";
import { Like } from "typeorm";
import { Controller } from "../base/controller";
import { HTTP_STATUS } from "../base/globals";
import { BadRequest, ErrorResponse, handleError, NotFound } from "../base/errorHandle";
import { Subject } from "../models/subjectModel";

interface GetResponse{ 
    response: Subject[];
    status: number; 
};

interface PostPutResponse{
    response: {
        user:Subject,
        message:string
    }
    status: number; 
}

export class SubjectController{

    async get(req: Request):Promise<GetResponse|ErrorResponse>{
        try {

            const where = {
                code        : req.query?.code && Like(`%${req.query.code}%`),
                name        : req.query?.name && Like(`%${req.query.name}%`),
                id_status   : req.query?.id_status
            }

            const controller = new Controller();
            const subject = await controller.get(Subject, where);

            if(subject.length == 0){
                throw new NotFound('Subjects not found');
            }
            
            return {response: subject, status: HTTP_STATUS.OK}
            
        } catch (error) {
            return handleError(error);
        }
    }
    
    async post(req: Request):Promise<PostPutResponse|ErrorResponse> {
        try {

            const { code, name, description, id_status } = req.body;
            const controller = new Controller();

            const validateCode = await controller.get(Subject, {code});

            if(validateCode){
                throw new BadRequest("Codigo ya registrado.");
            }

            const subject = new Subject();
            subject.code = code;
            subject.name = name;
            subject.description = description;
            subject.id_status = id_status;

            const newSubject = await controller.upsert(Subject, subject) as Subject;
            const response = {
                subject: newSubject,
                message: "Asignatura creada.",
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
            let subject = await controller.getById(Subject, req.body.id);
        
            if (!subject) {
                throw new BadRequest('Subject not found');
            }
      
            subject = Object.assign(subject, req.body);
            const subjectUpdated = await controller.upsert(Subject, subject) as Subject;
        
            const response = {
                subject: subjectUpdated,
                message: "Asignatura actualizado.",
                status: HTTP_STATUS.CREATED
            }
            return {response, status: HTTP_STATUS.CREATED}

        } catch (error) {
            return handleError(error);
        }
    };
}