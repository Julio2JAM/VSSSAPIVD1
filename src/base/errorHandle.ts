import { HTTP_STATUS } from "./globals";

export interface ErrorResponse{
    response: {message: string, status: number},
    status: number
}

export class NotFound extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'NotFound';
    }
}
  
export class BadRequest extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BadRequest';
    }
}
  
export class Unauthorized extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Unauthorized';
    }
}

export function handleError(err: unknown) {

    if (!(err instanceof Error)) {
        const status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
        return { status, response:{ message: 'An unknown error occurred', status: status }};
    }

    const errorMap: { [key: string]: number } = {
        NotFound: HTTP_STATUS.NOT_FOUND,
        BadRequest: HTTP_STATUS.BAD_REQUEST,
        Unauthorized: HTTP_STATUS.UNAUTHORIZED
    };

    const status = errorMap[err.name] || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    return { status, response:{ message: err.message, status: status }};

}
