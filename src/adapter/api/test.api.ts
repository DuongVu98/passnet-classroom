import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { LoggingInterceptor } from "src/config/interceptors/logging.interceptor";
import { SomeService } from "src/usecases/some.service";

@Controller("test")
@UseInterceptors(new LoggingInterceptor())
export class TestApi {
	constructor(private someService: SomeService) {}

	@Get()
	test(): void {
		this.someService.someExecute();
	}
}
