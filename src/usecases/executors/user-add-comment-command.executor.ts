import { CommandExecutor } from "src/usecases/executors/command.executor";
import { BaseCommand, UserAddCommentCommand } from "src/domain/commands/commands";
import { Comment } from "src/domain/aggregate/entities/comment.entity";
import { Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { UuidGenerateService } from "src/usecases/services/uuid-generate.service";
import { ClassroomAggregateRepository } from "src/domain/repositories/classroom.repository";
import { CommentId, Content, UserId } from "src/domain/aggregate/vos/value-objects";
import { Member } from "src/domain/aggregate/entities/member.entity";
import { ClassroomDomainFunctions } from "src/domain/aggregate/entities/classroom.root";

export class UserAddCommentCommandExecutor implements CommandExecutor {
	logger: Logger = new Logger("UserAddCommentCommandExecutor");

	constructor(private classroomRepository: ClassroomAggregateRepository, private uuidGenerateService: UuidGenerateService) {}

	execute(command: BaseCommand): Promise<any> {
		if (command instanceof UserAddCommentCommand) {
			return this.classroomRepository
				.findById(command.aggregateId)
				.then((classroom) => {
					const post = classroom.posts.filter((p) => p.postId.value === command.postId)[0];
					const newComment = Builder(Comment)
						.content(new Content(command.content))
						.commentId(new CommentId(this.uuidGenerateService.generateUUID()))
						.owner(new Member(new UserId(command.commentOwnerId)))
						.build();

					const aggregate = new ClassroomDomainFunctions(classroom).addCommentToPost(newComment, post);

					return this.classroomRepository.update(aggregate);
				})
				.then((aggregate) => {
					this.logger.log(`added new comment to aggregate ${aggregate}`);
				});
		} else {
			return Promise.reject();
		}
	}
}
