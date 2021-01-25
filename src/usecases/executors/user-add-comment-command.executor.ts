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

export class UserAddCommentCommandExecutor extends AbstractCommandExecutor<UserAddCommentCommand, void> {
	logger: Logger = new Logger("UserAddCommentCommandExecutor");

	execute(): Promise<void> {
		return this.aggregateRepository
			.findById(new ClassroomId(this.command.aggregateId))
			.then((classroom) => {
				const post = classroom.posts.filter((p) => p.postId.equals(new PostId(this.command.postId)))[0];
				const newComment = Builder<Comment>()
					.content(new Content(this.command.content))
					.commentId(new CommentId("comment1"))
					.commentOwner(new UserId(this.command.commentOwnerId))
					.build();

				classroom.addCommentToPost(newComment, post);

				return this.aggregateRepository.updateById(classroom, classroom.id);
			})
			.then((aggregate) => {
				this.logger.log(`added new comment to aggregate ${aggregate}`);
			});
	}
}
