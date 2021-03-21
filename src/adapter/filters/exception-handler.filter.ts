import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { ClassroomNotCreatedException, ClassroomNotFoundException } from "src/domain/exceptions/exceptions";
import { Request, Response } from "express";

@Catch(ClassroomNotFoundException)
export class ClassroomNotFoundExceptionHandler implements ExceptionFilter {
	catch(exception: ClassroomNotFoundException, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.getStatus();

		response.status(status).json({
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			message: exception.message,
		});
	}
}

@Catch(ClassroomNotCreatedException)
export class ClassroomNotCreatedExceptionHandler implements ExceptionFilter {
	catch(exception: ClassroomNotCreatedException, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.getStatus();

		response.status(status).json({
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			message: exception.message,
		});
	}
}
