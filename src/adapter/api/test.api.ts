import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { LoggingInterceptor } from "src/config/interceptors/logging.interceptor";
import { ClassroomViewRepository } from "src/domain/view-repo/classroom-view.repository";
import { SomeService } from "src/usecases/some.service";

@Controller("test")
export class TestApi {
	constructor(
		private someService: SomeService,
        private viewRepository: ClassroomViewRepository,
	) {}

	@Get()
	test(): void {
		this.someService.someExecute();
	}

	@UseInterceptors(LoggingInterceptor)
	@Get("test2")
	test2(): void {
		return null;
    }
    
    @Get("test3")
    public getView(): any {
        return this.viewRepository.findByPostId("0a2ccf91-c01e-4694-a8b0-537287b5c138")
    }
}
