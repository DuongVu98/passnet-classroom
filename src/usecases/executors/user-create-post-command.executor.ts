import { CommandExecutor } from "src/usecases/executors/command.executor";
import { BaseCommand, CreatePostCommand } from "src/domain/commands/commands";
import { Post } from "src/domain/aggregate/entities/post.entity";
import { Builder } from "builder-pattern";
import { Logger } from "@nestjs/common";
import { UuidGenerateService } from "src/usecases/services/uuid-generate.service";
import { ClassroomAggregateRepository } from "src/domain/repositories/classroom.repository";
import { ClassroomId, Content, PostId, ProfileId } from "src/domain/aggregate/vos/value-objects";
import { Member } from "src/domain/aggregate/entities/member.entity";
import { ClassroomDomainFunctions } from "src/domain/aggregate/entities/classroom.root";
import { CommandNotCompatibleException } from "src/domain/exceptions/exceptions";

export class UserCreatePostCommandExecutor implements CommandExecutor {
	logger: Logger = new Logger("CreateClassroomCommandExecutor");

	constructor(private classroomRepository: ClassroomAggregateRepository, private uuidGenerateService: UuidGenerateService) {}

	execute(command: BaseCommand): Promise<any> {
		if (command instanceof CreatePostCommand) {
			return this.classroomRepository
				.findById(new ClassroomId(command.aggregateId))
				.then((classroom) => {
					const post: Post = Builder(Post)
						.postId(new PostId(this.uuidGenerateService.generateUUID()))
						.comments([])
						.content(new Content(command.postContent))
						.owner(Builder(Member).profileId(new ProfileId(command.userId)).build())
						.build();

					const aggregate = new ClassroomDomainFunctions(classroom).addPost(post);
					return this.classroomRepository.insert(aggregate);
				})
				.then((aggregate) => {
					this.logger.log(`created new post to aggregate ${aggregate}`);
				});
		} else {
			return Promise.reject(new CommandNotCompatibleException("CreatePostCommand"));
		}
	}
}
