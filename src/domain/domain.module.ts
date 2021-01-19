import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClassroomSchema } from "./aggregate-test/classroom.root";
import { ClassroomEntity } from "./entities/classroom.entity";
import { CommentEntity } from "./entities/comment.entity";
import { PostEntity } from "./entities/post.entity";
import { UserEntity } from "./entities/user.entity";
import { ClassroomAggregateMapper } from "./mappers/classroom-aggregate.mapper";
import { ClassroomEntityMapper } from "./mappers/classroom-entity.mapper";
import { CommentAggregateMapper } from "./mappers/comment-aggregate.mapper";
import { PostAggregateMapper } from "./mappers/post-aggregate.mapper";
import { UserAggregateMapper } from "./mappers/user-aggregate.mapper";
import { ClassroomRepository } from "./repositories/classroom.repository";
import { CommentRepository } from "./repositories/comment.repository";
import { PostRepository } from "./repositories/post.repository";
import { UserRepository } from "./repositories/user.repository";
import { ClassroomQueryRepository } from "./view-repo/classroom-query.repository";
import { ClassroomViewRepository } from "./view-repo/classroom-view.repository";
import { ClassroomViewSchema } from "./views/classroom.view";

@Module({
	imports: [
		TypeOrmModule.forFeature([ClassroomEntity, PostEntity, UserEntity, CommentEntity]),
		MongooseModule.forFeature([
			{ name: "classroom_views", schema: ClassroomViewSchema, collection: "classroom_views" },
			{ name: "c", schema: ClassroomSchema, collection: "classrooms" },
		]),
	],
	providers: [
		ClassroomViewRepository,
		ClassroomQueryRepository,
		{
			provide: "classroom-entity-mapper",
			useClass: ClassroomEntityMapper,
		},
		{
			provide: "classroom-repository",
			useClass: ClassroomRepository,
		},
		{
			provide: "user-repository",
			useClass: UserRepository,
		},
		{
			provide: "post-repository",
			useClass: PostRepository,
		},
		{
			provide: "comment-repository",
			useClass: CommentRepository,
		},
		{
			provide: "classroom-aggregate-mapper",
			useClass: ClassroomAggregateMapper,
		},
		{
			provide: "user-aggregate-mapper",
			useClass: UserAggregateMapper,
		},
		{
			provide: "post-aggregate-mapper",
			useClass: PostAggregateMapper,
		},
		{
			provide: "comment-aggregate-mapper",
			useClass: CommentAggregateMapper,
		},
	],
	exports: [
		ClassroomViewRepository,
		ClassroomQueryRepository,
		"classroom-entity-mapper",
		"classroom-repository",
		"user-repository",
		"post-repository",
		"comment-repository",
		"classroom-aggregate-mapper",
		"user-aggregate-mapper",
		"post-aggregate-mapper",
		"comment-aggregate-mapper",
	],
})
export class DomainModule {}
