import { AbstractCommandExecutor } from "src/usecases/executors/command.executor";
import { BaseCommand } from "src/domain/commands/command.abstract";
import { ClassroomAggregateRootRepository } from "src/domain/repostiories-test/classroom.repository";
import { ClassroomId } from "src/domain/aggregate-test/vos/classroom-id.vo";
import { Post } from "src/domain/aggregate-test/entities/post.entity";
import { Builder } from "builder-pattern";
import { Content } from "src/domain/aggregate-test/vos/content.vo";
import { UserId } from "src/domain/aggregate-test/vos/user-id.vos";
import { PostId } from "src/domain/aggregate-test/vos/post-id.vo";

export class StudentCreatePostCommand extends BaseCommand {
	studentId: string;
	postContent: string;
	aggregateId: string;
}

export class UserCreatePostCommandExecutor extends AbstractCommandExecutor<StudentCreatePostCommand, void> {

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
