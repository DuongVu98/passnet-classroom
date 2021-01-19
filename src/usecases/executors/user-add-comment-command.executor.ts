import { AbstractCommandExecutor } from "src/usecases/executors/command.executor";
import { BaseCommand, UserAddCommentCommand } from "src/domain/commands/commands";
import { ClassroomAggregateRootRepository } from "src/domain/repositories/classroom.repository";
import { ClassroomId } from "src/domain/aggregate/vos/classroom-id.vo";
import { PostId } from "src/domain/aggregate/vos/post-id.vo";
import { Builder } from "builder-pattern";
import { Comment } from "src/domain/aggregate/entities/comment.entity";
import { Content } from "src/domain/aggregate/vos/content.vo";
import { CommentId } from "src/domain/aggregate/vos/comment-id.vo";
import { UserId } from "src/domain/aggregate/vos/user-id.vos";

export class UserAddCommentCommandExecutor extends AbstractCommandExecutor<UserAddCommentCommand, void>{

	aggregateRepository: ClassroomAggregateRootRepository;

	execute(): Promise<void> {
		return this.aggregateRepository.findById(new ClassroomId(this.command.aggregateId)).then(classroom => {
			const post = classroom.posts.filter(p => p.postId.equals(new PostId(this.command.postId)))[0];
			const newComment = Builder<Comment>()
				.content(new Content(this.command.content))
				.commentId(new CommentId("comment1"))
				.commentOwner(new UserId(this.command.commentOwnerId))
				.build();

			classroom.addCommentToPost(newComment, post);
		})
	}

}
