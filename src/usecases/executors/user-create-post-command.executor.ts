import { AbstractCommandExecutor } from "src/usecases/executors/command.executor";
import { BaseCommand, UserCreatePostCommand } from "src/domain/commands/commands";
import { ClassroomAggregateRootRepository } from "src/domain/repositories/classroom.repository";
import { ClassroomId } from "src/domain/aggregate/vos/classroom-id.vo";
import { Post } from "src/domain/aggregate/entities/post.entity";
import { Builder } from "builder-pattern";
import { Content } from "src/domain/aggregate/vos/content.vo";
import { UserId } from "src/domain/aggregate/vos/user-id.vos";
import { PostId } from "src/domain/aggregate/vos/post-id.vo";

export class UserCreatePostCommandExecutor extends AbstractCommandExecutor<UserCreatePostCommand, void> {

	aggregateRepository: ClassroomAggregateRootRepository

	execute(): Promise<void> {
		return this.aggregateRepository.findById(new ClassroomId(this.command.aggregateId)).then(classroom => {
			const post: Post = Builder<Post>()
				.postId(new PostId("post1"))
				.comments([])
				.content(new Content(this.command.postContent))
				.postOwner(new UserId(this.command.studentId))
				.build();
		})
	}

}
