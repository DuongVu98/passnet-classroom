import { Inject, Injectable, Logger, UseInterceptors } from "@nestjs/common";
import { LoggingInterceptor } from "src/config/interceptors/logging.interceptor";
import { ClassroomEntity } from "src/domain/entities/classroom.entity";
import { EntityRepository } from "src/domain/repositories/repository.interface";

@Injectable()
@UseInterceptors(LoggingInterceptor)
export class SomeService {
	logger: Logger = new Logger();

	constructor(@Inject("classroom-repository") private classroomRepository: EntityRepository<ClassroomEntity>) {}

	someExecute(): void {
		this.classroomRepository.findAll().then((result) => {
			this.logger.log(result);
		});
	}
}
