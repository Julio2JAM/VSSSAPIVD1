import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from './globals';
import { verifyToken } from '../libs/jwt';
import { Role, RoleType } from '../models/roleModel';

export class Middleware {

    public authenticateToken = (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Access denied. No token provided.' });
        }
    
        const decoded = verifyToken(token);
        if (!decoded.valid) {
            return res.status(HTTP_STATUS.FORBIDDEN).json({ message: 'Access denied. Invalid token.' });
        }

        next(); // Llama a next() si todo está bien

    };

    
    checkProfessorRole(req: Request, res: Response, next: NextFunction) {

        const user = req.user;
        if (compararRol(user?.role, RoleType.PROFESSOR)) {
        }
        return next();

    }

    checkAdminRole(req: Request, res: Response, next: NextFunction) {

        const user = req.user;
        if (compararRol(user?.role, RoleType.ADMIN)) {
        }
        return next();

    }

}

function compararRol(rol: Role | number | undefined | null, tipoRol: RoleType): boolean {
    
    // Verifica si rol es nulo o indefinido
    if (!rol) {
        return false;
    }

    // Si rol es un número, compara directamente
    if (typeof rol === 'number') {
        return rol === tipoRol;
    }
    
    // Si rol es un objeto, compara su código con tipoRol
    if (typeof rol === 'object') {
        return rol.code === RoleType[tipoRol];
    }

    return false;

}