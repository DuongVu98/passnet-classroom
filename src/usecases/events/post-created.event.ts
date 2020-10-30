import { PostAggregate } from "src/domain/aggregate/post.aggregate";
import { CommentEntity } from "src/domain/entities/comment.entity";
import { IAggregateMapper } from "src/domain/mappers/aggregate.mapper";
import { ClassroomViewRepository } from "src/domain/view-repo/classroom-view.repository";
import { PostView } from "src/domain/views/post.view";
import { IDomainEvent } from "./event.factory";

export class PostCreatedEvent implements IDomainEvent {
	private classroomViewRepository: ClassroomViewRepository;
	private commentAggregateMapper: IAggregateMapper<CommentEntity>;

	constructor(private aggregate: PostAggregate, private aggregateRootIdentifier: string) {}

	execute(): void {
		this.classroomViewRepository.findById(this.aggregateRootIdentifier).then(async (view) => {
			const postOwners = view.students.filter((student) => student.studentId == this.aggregate.postOwnerId);
			const newPostView = new PostView()
				.withPostId(this.aggregate.postId)
				.withPostOwner(postOwners[0])
				.withContent(this.aggregate.content);
			await view.posts.push(newPostView);

			this.classroomViewRepository.update(this.aggregateRootIdentifier, view);
		});
	}
}
