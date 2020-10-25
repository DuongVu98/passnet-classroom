import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { LoggingInterceptor } from "src/config/interceptors/logging.interceptor";
import { SomeService } from "src/usecases/some.service";

@Controller("test")
export class TestApi {
	constructor(private someService: SomeService) {}

	@Get()
	test(): void {
		this.someService.someExecute();
	}

	@UseInterceptors(LoggingInterceptor)
	@Get("test2")
	test2(): void {
		return null;
	}
}
