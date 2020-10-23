import { Module } from "@nestjs/common";
import { UsecasesModule } from "src/usecases/usecases.module";
import { TestApi } from "./api/test.api";

@Module({
    imports: [UsecasesModule],
    controllers: [TestApi]
})
export class AdapterModule {}
