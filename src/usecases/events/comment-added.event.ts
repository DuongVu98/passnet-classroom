import { Logger } from "@nestjs/common";
import { CommentAgregate } from "src/domain/aggregate/comment.aggregate";
import { ClassroomViewRepository } from "src/domain/view-repo/classroom-view.repository";
import { CommentView } from "src/domain/views/comment.view";
import { IDomainEvent } from "./event.factory";

export class CommentAddedEvent implements IDomainEvent {
	logger: Logger = new Logger("CommentAddedEvent");

	private viewRepository: ClassroomViewRepository;

	constructor(private aggregate: CommentAgregate) {}

	execute(): void {
		this.viewRepository.findById(this.aggregate.aggregateRootIdentifier).then(async (view) => {
			const ownerView = view.students.find((user) => user.studentId === this.aggregate.commentOwnerId);
			const post = view.posts.find((postView) => postView.postId === this.aggregate.postId);

			const newComment = new CommentView()
				.withId(this.aggregate.commentId)
				.withContent(this.aggregate.content)
				.withCommentOwner(ownerView);
			if (post.comments) {
				await post.comments.push(newComment);
			} else {
				post.comments = [newComment];
			}

			await view.posts.map((currentPost) => {
				if (currentPost.postId === post.postId) {
					return post;
				} else {
					return currentPost;
				}
			});

			this.viewRepository.update(view.classroomId, view);
		});
	}

	withViewRepository(repository: ClassroomViewRepository): CommentAddedEvent {
		this.viewRepository = repository;
		return this;
	}
}
