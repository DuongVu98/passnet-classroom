import { Injectable, Logger } from "@nestjs/common";
import * as IoRedis from "ioredis";
import { Cacheable, CacheClear } from "@type-cacheable/core";
import { Builder } from "builder-pattern";
import { ClassroomId } from "src/domain/aggregate/vos/classroom-id.vo";
import { ClassroomAggregateRootRepository } from "src/domain/repositories/classroom.repository";
import { ClassroomView, CommentView, PostView } from "src/domain/views/views";
import { useAdapter } from "@type-cacheable/redis-adapter";

const userClient = new IoRedis({
	lazyConnect: true,
	host: "192.168.99.100",
	port: 6379,
});
const clientAdapter = useAdapter(userClient);

@Injectable()
export class ViewProjector {
	logger: Logger = new Logger("ViewProjector");

	constructor(private aggregateRepository: ClassroomAggregateRootRepository) {}

	public async queryClassroomView(aggregateId: string): Promise<ClassroomView> {
		const idToFind = new ClassroomId(aggregateId);

		return this.aggregateRepository.findById(idToFind).then((aggregate) => {
			return Builder(ClassroomView)
				.classroomId(aggregateId)
				.courseName(aggregate.courseName.name)
				.students(aggregate.students.map((s) => s._id))
				.teacher(aggregate.teacherId.getId)
				.teacherAssistanceList(aggregate.teacherAssistanceList.map((ta) => ta._id))
				.posts(
					aggregate.posts.map((post) =>
						Builder(PostView)
							.postId(post.postId._id)
							.postOwner(post.postOwner._id)
							.content(post.content.content)
							.comments(
								post.comments.map((comment) =>
									Builder(CommentView)
										.commentId(comment.id._id)
										.commentOwner(comment.commentOwner._id)
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
}
