import { CacheModule, Module } from "@nestjs/common";
import { DomainModule } from "src/domain/domain.module";
import { UsecasesModule } from "src/usecases/usecases.module";
import { HomeController } from "./api/home.controller";
import { TestApi } from "./api/test.api";
import { EventHandlerFacde } from "./facades/event-handler.facade";
import { EventConsumerGrpcGateway } from "./grpc/event-consumer-grpc.gateway";

@Module({
	imports: [UsecasesModule, DomainModule],
	controllers: [TestApi, HomeController, EventConsumerGrpcGateway],
	providers: [EventHandlerFacde],
})
export class AdapterModule {}
