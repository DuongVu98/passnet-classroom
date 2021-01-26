import { CacheKey, CacheTTL, Injectable, Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { ClassroomId } from "src/domain/aggregate/vos/classroom-id.vo";
import { ClassroomAggregateRootRepository } from "src/domain/repositories/classroom.repository";
import { ClassroomView, CommentView, PostView } from "src/domain/views/views";

@Injectable()
export class ViewProjector {
    
    logger: Logger = new Logger("ViewProjector");
    
	constructor(private aggregateRepository: ClassroomAggregateRootRepository) {}

    @CacheTTL(10)
    @CacheKey("classroom_view")
	queryClassroomView(aggregateId: string): Promise<ClassroomView> {
        const idToFind = new ClassroomId(aggregateId);

		return this.aggregateRepository.findById(idToFind).then((aggregate) => {
            this.logger.debug(`id from query: ${JSON.stringify(aggregate.id)}`)
			return Builder(ClassroomView)
				.classroomId(aggregateId)
				.courseName(aggregate.courseName.name)
				.students(aggregate.students.map((s) => s.id))
				.teacher(aggregate.teacherId.id)
				.teacherAssistanceList(aggregate.teacherAssistanceList.map((ta) => ta.id))
				.posts(
					aggregate.posts.map((post) =>
						Builder(PostView)
							.postId(post.postId.id)
							.postOwner(post.postOwner.id)
							.content(post.content.content)
							.comments(
								post.comments.map((comment) =>
									Builder(CommentView)
										.commentId(comment.id.id)
										.commentOwner(comment.commentOwner.id)
										.content(comment.content.content)
										.build()
								)
							)
							.build()
					)
				)
				.build();
		});
    }
    
    queryForCacheTest(): {field: string} {
        return {
            field: "hello"
        }
    }
}
