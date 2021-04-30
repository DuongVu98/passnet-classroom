import { Injectable, Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { Classroom } from "src/domain/aggregate-sql/entities";
import { Job, User } from "src/domain/aggregate-sql/value-objects";
import { ClassroomNotCreatedException, ClassroomNotFoundException } from "src/domain/exceptions/exceptions";
import { ClassroomRepository, TestRepository } from "src/domain/repositories-sql/aggregate.repository";
import { ClassroomLiteView, ClassroomView, CommentView, PostView } from "src/domain/views/views";

@Injectable()
export class ViewProjector {
	logger: Logger = new Logger("ViewProjector");

	constructor(private testRepository: TestRepository, private aggregateRepository: ClassroomRepository) {}

	public async queryClassroomView(aggregateId: string): Promise<ClassroomView> {
		return this.aggregateRepository.findById(aggregateId).then((aggregate) => {
			if (this.isAggregateNotNull(aggregate)) {
				return this.mapEntityToView(aggregate);
			} else {
				throw new ClassroomNotFoundException(aggregateId);
			}
		});
	}

	public async queryClassroomViewFromJob(jobId: string): Promise<ClassroomView> {
		return this.aggregateRepository.findByJob(new Job(jobId)).then((aggregate) => {
			if (this.isAggregateNotNull(aggregate)) {
				return this.mapEntityToView(aggregate);
			} else {
				throw new ClassroomNotCreatedException(jobId);
			}
		});
	}

	private isAggregateNotNull(aggregate: Classroom): boolean {
		return aggregate != null;
	}

	private mapEntityToView(aggregate: Classroom): ClassroomView {
		return Builder(ClassroomView)
			.classroomId(aggregate.id)
			.courseName(aggregate.courseName.value)
			.students(aggregate.students.map((s) => s.value))
			.teacher(aggregate.teacher.value)
			.teacherAssistanceList(aggregate.teacherAssistanceList.map((ta) => ta.value))
			.posts(
				aggregate.posts.map((post) =>
					Builder(PostView)
						.postId(post.id)
						.postOwner(post.owner.value)
						.content(post.content.value)
						.comments(
							post.comments.map((comment) => {
								this.logger.debug(comment);
								return Builder(CommentView)
									.commentId(comment.id)
									.commentOwner(comment.owner.value)
									.content(comment.content.value)
									.build();
							})
						)
						.build()
				)
			)
			.build();
	}

	public getClassroomListByMemberType(memberType: string, uid: string): Promise<ClassroomLiteView[]> {
		switch (memberType) {
			case "student":
				return this.getClassroomListByStudent(uid);
			case "teacherAssistance":
				return this.getClassroomListByTeacherAssistance(uid);
			case "teacher":
				return this.getClassroomListByTeacher(uid);
		}
	}

	private getClassroomListByStudent(uid: string): Promise<ClassroomLiteView[]> {
		return this.aggregateRepository.findAll().then((classroomList) => {
			return classroomList
				.filter((classroom) => classroom.students.some((student) => student === new User(uid)))
				.map((classroom) => Builder(ClassroomLiteView).classroomId(classroom.id).courseName(classroom.courseName.value).build());
		});
	}

	private getClassroomListByTeacherAssistance(uid: string): Promise<ClassroomLiteView[]> {
		this.logger.log("process get classroomlist");

		return this.aggregateRepository.findAll().then((classroomList) => {
			return classroomList
				.filter((classroom) => classroom.teacherAssistanceList.some((ta) => ta === new User(uid)))
				.map((classroom) => Builder(ClassroomLiteView).classroomId(classroom.id).courseName(classroom.courseName.value).build());
		});
	}

	private getClassroomListByTeacher(uid: string): Promise<ClassroomLiteView[]> {
		return this.aggregateRepository.findAll().then((classroomList) => {
			return classroomList
				.filter((classroom) => classroom.teacher === new User(uid))
				.map((classroom) => Builder(ClassroomLiteView).classroomId(classroom.id).courseName(classroom.courseName.value).build());
		});
	}
}
