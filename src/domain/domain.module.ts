import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ClassroomSchema } from "./aggregate/classroom.root";
import { ClassroomQueryRepository } from "./view-repo/classroom-query.repository";
import { ClassroomViewRepository } from "./view-repo/classroom-view.repository";
import { ClassroomViewSchema } from "./views/classroom.view";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: "classroom_views", schema: ClassroomViewSchema, collection: "classroom_views" },
			{ name: "c", schema: ClassroomSchema, collection: "classrooms" },
		]),
	],
	providers: [ClassroomViewRepository, ClassroomQueryRepository],
	exports: [ClassroomViewRepository, ClassroomQueryRepository],
})
export class DomainModule {}
