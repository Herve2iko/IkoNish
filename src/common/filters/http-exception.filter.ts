import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { timeStamp } from "console";
import { Request, Response } from "express";


@Catch()
export class AllExceptionsFilter implements ExceptionFilter{
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message:any = 'Erreur interne de server'

        if (exception instanceof HttpException) {
            status = exception.getStatus()
            message = exception.getResponse()
        }else if (exception instanceof Error) {
            message = exception.message
        }
        response.status(status).json({
            statusCode : status,
            timeStamp: new Date().toDateString,
            path: request.url,
            method: request.method,
            message: message
        })
    }

}