import { Module } from "@nestjs/common";
import { DomainModule } from "src/domain/domain.module";
import { SomeService } from "./some.service";

@Module({
    imports: [DomainModule],
    providers: [SomeService]
})
export class UsecasesModule {}
