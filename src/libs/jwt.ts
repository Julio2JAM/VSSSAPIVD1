import jwt from 'jsonwebtoken'
import { User } from '../models/userModel';
import { TOKEN_KEY } from '../base/globals';

interface VerifyTokenResult { 
    valid: boolean; 
    decoded?: any;
    error?: string; 
}

// Función para crear un token
export const newToken = (user:User):string|null => {
    try {

        if(!TOKEN_KEY){
            throw new Error("Missing token key.");
        }
        const token = jwt.sign({ user }, TOKEN_KEY, { expiresIn: '7d' });
        return token;

    } catch (error) {
        console.log(error);
        return null;
    }
};

// Función para verificar un token
export const verifyToken = (token:string):VerifyTokenResult => {
    try {

        if(!TOKEN_KEY){
            throw new Error("Missing token key.");
        }

        const decoded = jwt.verify(token, TOKEN_KEY);
        return { valid: true, decoded };

    } catch (error:unknown) {
        const message = error instanceof Error ? error.message : "Error al decoficar token.";
        return { valid: false, error: message };
    }
};
