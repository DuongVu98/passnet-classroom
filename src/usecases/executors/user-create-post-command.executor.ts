import { AbstractCommandExecutor } from "src/usecases/executors/command.executor";
import { UserCreatePostCommand } from "src/domain/commands/commands";
import { ClassroomId } from "src/domain/aggregate/vos/classroom-id.vo";
import { Post } from "src/domain/aggregate/entities/post.entity";
import { Builder } from "builder-pattern";
import { Content } from "src/domain/aggregate/vos/content.vo";
import { UserId } from "src/domain/aggregate/vos/user-id.vos";
import { PostId } from "src/domain/aggregate/vos/post-id.vo";
import { Logger } from "@nestjs/common";

export class UserCreatePostCommandExecutor extends AbstractCommandExecutor<UserCreatePostCommand, void> {
	logger: Logger = new Logger("CreateClassroomCommandExecutor");

	execute(): Promise<void> {
		return this.aggregateRepository
			.findById(new ClassroomId(this.command.aggregateId))
			.then((classroom) => {
				const post: Post = Builder<Post>()
					.postId(new PostId("post1"))
					.comments([])
					.content(new Content(this.command.postContent))
					.postOwner(new UserId(this.command.userId))
					.build();

				classroom.addPost(post);
				return this.aggregateRepository.insert(classroom);
			})
			.then((aggregate) => {
				this.logger.log(`created new post to aggregate ${aggregate}`);
			});
	}
}
