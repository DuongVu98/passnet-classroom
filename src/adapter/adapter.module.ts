import { Module } from "@nestjs/common";
import { DomainModule } from "src/domain/domain.module";
import { UsecasesModule } from "src/usecases/usecases.module";
import { TestApi } from "./api/test.api";

@Module({
	imports: [UsecasesModule, DomainModule],
	controllers: [TestApi],
})
export class AdapterModule {}
