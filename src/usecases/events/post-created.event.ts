import { Logger } from "@nestjs/common";
import { PostAggregate } from "src/domain/aggregate/post.aggregate";
import { ClassroomViewRepository } from "src/domain/view-repo/classroom-view.repository";
import { PostView } from "src/domain/views/post.view";
import { IDomainEvent } from "./event.factory";

export class PostCreatedEvent implements IDomainEvent {
	logger: Logger = new Logger("PostCreatedEvent");

	private classroomViewRepository: ClassroomViewRepository;

	constructor(private aggregate: PostAggregate, private aggregateRootIdentifier: string) {}

	execute(): void {
		this.classroomViewRepository.findById(this.aggregateRootIdentifier).then(async (view) => {
			const postOwners = view.students.filter((student) => {
				this.logger.debug(`${student.studentId} compare with ${this.aggregate.postOwnerId}`);
				return student.studentId === this.aggregate.postOwnerId;
			});
			this.logger.debug(`found post owner --> ${postOwners}`);
			const newPostView = new PostView()
				.withPostId(this.aggregate.postId)
				.withPostOwner(postOwners[0])
				.withContent(this.aggregate.content);
			await view.posts.push(newPostView);

			this.classroomViewRepository.update(this.aggregateRootIdentifier, view);
		});
	}

	withClassroomViewRepository(repository: ClassroomViewRepository): PostCreatedEvent {
		this.classroomViewRepository = repository;
		return this;
	}
}
