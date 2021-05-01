import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ClassroomSchema } from "./aggregate/entities/classroom.root";
import { ClassroomAggregateRepository } from "./repositories/classroom.repository";

@Module({
	imports: [MongooseModule.forFeature([{ name: "classrooms-repository", schema: ClassroomSchema, collection: "classrooms" }])],
	providers: [ClassroomAggregateRepository],
	exports: [ClassroomAggregateRepository],
})
export class DomainModule {}
