import { AbstractCommandExecutor } from "src/usecases/executors/command.executor";
import { UserAddCommentCommand } from "src/domain/commands/commands";
import { Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { UuidGenerateService } from "src/usecases/services/uuid-generate.service";
import { Comment } from "src/domain/aggregate-sql/domain.entities";
import { Content, User } from "src/domain/aggregate-sql/value-objects";
export class UserAddCommentCommandExecutor extends AbstractCommandExecutor<UserAddCommentCommand, void> {
	logger: Logger = new Logger("UserAddCommentCommandExecutor");

	uuidGenerateService: UuidGenerateService;

	execute(): Promise<void> {
		return this.aggregateRepository
			.findById(this.command.aggregateId)
			.then(async (classroom) => {
				const post = classroom.posts.filter((p) => p.id === this.command.postId)[0];
				const newComment = Builder(Comment)
					.id(this.uuidGenerateService.generateUUID())
					.content(new Content(this.command.content))
					.owner(new User(this.command.commentOwnerId))
					.build();

				await classroom.addCommentToPost(newComment, post);

				return this.aggregateRepository.update(classroom);
			})
			.then((aggregate) => {
				this.logger.log(`added new comment to aggregate ${aggregate}`);
			});
	}
}
