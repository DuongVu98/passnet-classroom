import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ClassroomSchema } from "./aggregate/classroom.root";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: "classrooms", schema: ClassroomSchema, collection: "classrooms" }
		]),
	],
	providers: [],
	exports: [],
})
export class DomainModule {}
