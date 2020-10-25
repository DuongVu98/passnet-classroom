import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommandFactory } from "src/usecases/commands/command.factory";
import { ClassroomEntity } from "./entities/classroom.entity";
import { CommentEntity } from "./entities/comment.entity";
import { PostEntity } from "./entities/post.entity";
import { UserEntity } from "./entities/user.entity";
import { DomainEventFactory } from "./events/event.factory";
import { ClassroomRepository } from "./repositories/classroom.repository";
import { CommentRepository } from "./repositories/comment.repository";
import { PostRepository } from "./repositories/post.repository";
import { UserRepository } from "./repositories/user.repository";

@Module({
	imports: [TypeOrmModule.forFeature([ClassroomEntity, PostEntity, UserEntity, CommentEntity])],
	providers: [
		CommandFactory,
		DomainEventFactory,
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
	],
	exports: [DomainEventFactory, CommandFactory, "classroom-repository", "user-repository", "post-repository", "comment-repository"],
})
export class DomainModule {}
