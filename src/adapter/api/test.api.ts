import { Controller, Get, Logger, Param, UseInterceptors } from "@nestjs/common";
import { LoggingInterceptor } from "src/config/interceptors/logging.interceptor";

@Controller("test")
export class TestApi {
	private logger: Logger = new Logger("HomeController");

	constructor() {}

	@UseInterceptors(LoggingInterceptor)
	@Get("test2")
	test2(): void {
		return null;
	}
}
