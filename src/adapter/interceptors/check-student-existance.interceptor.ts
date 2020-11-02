import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
@Injectable()
export class CheckStudentExistanceInterceptor implements NestInterceptor {
	logger: Logger = new Logger("CheckStudentExistanceInterceptor");

	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		throw new Error("Method not implemented.");
	}
}
