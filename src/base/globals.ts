import dotenv from 'dotenv'
dotenv.config();

export const HTTP_STATUS = {
    OK:200,
    CREATED:201,
    ACCEPTED:202,
    NOT_MODIFIED:304,
    BAD_REQUEST:400,
    UNAUTHORIZED:401,
    FORBIDDEN:403,
    NOT_FOUND:404,
    INTERNAL_SERVER_ERROR:500
}

export const SERVER = {
    PORT:process.env.PORT || 3000
}

export const TOKEN_KEY = process.env.TOKEN_KEY;