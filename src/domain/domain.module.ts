import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ClassroomSchema } from "./aggregate/classroom.root";
import { ClassroomAggregateRootRepository } from "./repositories/classroom.repository";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: "classrooms-repository", schema: ClassroomSchema, collection: "classrooms" }
		]),
	],
	providers: [ClassroomAggregateRootRepository],
	exports: [ClassroomAggregateRootRepository],
})
export class DomainModule {}
