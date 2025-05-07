export class AppError extends Error {
    statusCode : number;
    constructor(statusCode,message){
        super(message)
        this.statusCode=this.statusCode;
        Error.captureStackTrace(this,this.constructor)
    }
}
