import { AbstractCommandExecutor } from "src/usecases/executors/command.executor";
import { UserCreatePostCommand } from "src/domain/commands/commands";
import { Builder } from "builder-pattern";
import { Logger } from "@nestjs/common";
import { UuidGenerateService } from "src/usecases/services/uuid-generate.service";
import { Post } from "src/domain/aggregate-sql/domain.entities";
import { Content, User } from "src/domain/aggregate-sql/value-objects";

export class UserCreatePostCommandExecutor extends AbstractCommandExecutor<UserCreatePostCommand, void> {
	logger: Logger = new Logger("CreateClassroomCommandExecutor");

	uuidGenerateService: UuidGenerateService;

	execute(): Promise<any> {
		return this.aggregateRepository
			.findById(this.command.aggregateId)
			.then(async (classroom) => {
				const post: Post = Builder(Post)
					.id(this.uuidGenerateService.generateUUID())
					.comments([])
					.content(new Content(this.command.postContent))
					.owner(new User(this.command.userId))
					.build();

				this.logger.debug(`debug found classroom -> ${JSON.stringify(classroom)}`);
				this.logger.debug(`debug posts -> ${JSON.stringify(classroom.posts)}`);
				await classroom.addPost(post);
				this.logger.debug(`debug found classroom -> ${JSON.stringify(classroom.posts)}`);
				return this.aggregateRepository.update(classroom);
			})
			.then(() => {
				return this.aggregateRepository.findById(this.command.aggregateId);
			});
	}
}
