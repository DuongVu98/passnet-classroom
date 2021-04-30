import { AbstractCommandExecutor } from "src/usecases/executors/command.executor";
import { UserCreatePostCommand } from "src/domain/commands/commands";
import { Builder } from "builder-pattern";
import { Logger } from "@nestjs/common";
import { UuidGenerateService } from "src/usecases/services/uuid-generate.service";
import { Post } from "src/domain/aggregate-sql/entities";
import { Content, User } from "src/domain/aggregate-sql/value-objects";

export class UserCreatePostCommandExecutor extends AbstractCommandExecutor<UserCreatePostCommand, void> {
	logger: Logger = new Logger("CreateClassroomCommandExecutor");

	uuidGenerateService: UuidGenerateService;

	execute(): Promise<void> {
		return this.aggregateRepository
			.findById(this.command.aggregateId)
			.then(async (classroom) => {
				const post: Post = Builder(Post)
					.id(this.uuidGenerateService.generateUUID())
					.comments([])
					.content(new Content(this.command.postContent))
					.owner(new User(this.command.userId))
					.build();

				await classroom.addPost(post);
				return this.aggregateRepository.insert(classroom);
			})
			.then((aggregate) => {
				this.logger.log(`created new post to aggregate ${aggregate}`);
			});
	}
}
