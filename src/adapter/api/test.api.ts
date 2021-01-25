import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { LoggingInterceptor } from "src/config/interceptors/logging.interceptor";

@Controller("test")
export class TestApi {
	constructor() {}

	@UseInterceptors(LoggingInterceptor)
	@Get("test2")
	test2(): void {
		return null;
	}
}
