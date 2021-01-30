import { AbstractCommandExecutor } from "src/usecases/executors/command.executor";
import { UserAddCommentCommand } from "src/domain/commands/commands";
import { ClassroomId } from "src/domain/aggregate/vos/classroom-id.vo";
import { PostId } from "src/domain/aggregate/vos/post-id.vo";
import { Comment } from "src/domain/aggregate/entities/comment.entity";
import { Content } from "src/domain/aggregate/vos/content.vo";
import { CommentId } from "src/domain/aggregate/vos/comment-id.vo";
import { UserId } from "src/domain/aggregate/vos/user-id.vos";
import { Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { ClassroomAggregateDomain } from "src/domain/aggregate/classroom.root";
import { UuidGenerateService } from "src/usecases/services/uuid-generate.service";

export class UserAddCommentCommandExecutor extends AbstractCommandExecutor<UserAddCommentCommand, void> {
	logger: Logger = new Logger("UserAddCommentCommandExecutor");

	uuidGenerateService: UuidGenerateService;

	execute(): Promise<void> {
		return this.aggregateRepository
			.findById(new ClassroomId(this.command.aggregateId))
			.then((classroom) => {
				const post = classroom.posts.filter((p) => p.postId._id === this.command.postId)[0];
				const newComment = Builder(Comment)
					.content(new Content(this.command.content))
					.commentId(new CommentId(this.uuidGenerateService.generateUUID()))
					.commentOwner(new UserId(this.command.commentOwnerId))
					.build();

				const aggregate = new ClassroomAggregateDomain(classroom).addCommentToPost(newComment, post);

				return this.aggregateRepository.updateById(aggregate, new ClassroomId(this.command.aggregateId));
			})
			.then((aggregate) => {
				this.logger.log(`added new comment to aggregate ${aggregate}`);
			});
	}
}
