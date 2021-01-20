import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { LoggingInterceptor } from "src/config/interceptors/logging.interceptor";
import { ClassroomViewRepository } from "src/domain/view-repo/classroom-view.repository";

@Controller("test")
export class TestApi {
	constructor(private viewRepository: ClassroomViewRepository) {}

	@UseInterceptors(LoggingInterceptor)
	@Get("test2")
	test2(): void {
		return null;
	}
}
