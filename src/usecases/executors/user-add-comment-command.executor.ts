import { CommandExecutor } from "src/usecases/executors/command.executor";
import { BaseCommand, AddCommentCommand } from "src/domain/commands/commands";
import { Comment } from "src/domain/aggregate/entities/comment.entity";
import { Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { UuidGenerateService } from "src/usecases/services/uuid-generate.service";
import { ClassroomAggregateRepository } from "src/domain/repositories/classroom.repository";
import { ClassroomId, CommentId, Content, ProfileId } from "src/domain/aggregate/vos/value-objects";
import { Member } from "src/domain/aggregate/entities/member.entity";
import { ClassroomDomainFunctions } from "src/domain/aggregate/entities/classroom.root";
import { CommandNotCompatibleException } from "src/domain/exceptions/exceptions";

export class AddCommentCommandExecutor implements CommandExecutor {
	logger: Logger = new Logger("UserAddCommentCommandExecutor");

	constructor(private classroomRepository: ClassroomAggregateRepository, private uuidGenerateService: UuidGenerateService) {}

	execute(command: BaseCommand): Promise<any> {
		if (command instanceof AddCommentCommand) {
			return this.classroomRepository
				.findById(new ClassroomId(command.aggregateId))
				.then((classroom) => {
					const post = classroom.posts.filter((p) => p.postId.value === command.postId)[0];
					const newComment = Builder(Comment)
						.content(new Content(command.content))
						.commentId(new CommentId(this.uuidGenerateService.generateUUID()))
						.owner(Builder(Member).profileId(new ProfileId(command.commentOwnerId)).build())
						.build();

					const aggregate = new ClassroomDomainFunctions(classroom).addCommentToPost(newComment, post);

					return this.classroomRepository.update(aggregate);
				})
				.then((aggregate) => {
					this.logger.log(`added new comment to aggregate ${aggregate}`);
				});
		} else {
			return Promise.reject(new CommandNotCompatibleException("AddCommentCommand"));
		}
	}
}
