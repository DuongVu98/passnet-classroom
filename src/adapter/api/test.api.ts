import { Controller, Get, Logger, Param, UseInterceptors } from "@nestjs/common";
import { Cacheable } from "@type-cacheable/core";
import { LoggingInterceptor } from "src/config/interceptors/logging.interceptor";
import * as IoRedis from "ioredis";
import { useAdapter } from "@type-cacheable/redis-adapter";

const userClient = new IoRedis({
	lazyConnect: true,
	host: "192.168.99.100",
	port: 6379,
});
const clientAdapter = useAdapter(userClient);

@Controller("test")
export class TestApi {
	private logger: Logger = new Logger("HomeController");

	constructor() {}

	@UseInterceptors(LoggingInterceptor)
	@Get("test2")
	test2(): void {
		return null;
    }
    
    @Get("test-cache")
    @Cacheable({ cacheKey: "numbers", client: clientAdapter })
	getValues(): Promise<number[]> {
		return Promise.resolve([1,2,3,4]);
	}
}
