import { Injectable, Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { Classroom } from "src/domain/aggregate/entities/classroom.root";
import { ClassroomId, Job } from "src/domain/aggregate/vos/value-objects";
import { ClassroomNotCreatedException, ClassroomNotFoundException } from "src/domain/exceptions/exceptions";
import { ClassroomAggregateRepository } from "src/domain/repositories/classroom.repository";
import { ClassroomLiteView, ClassroomView, CommentView, PostView } from "src/domain/views/views";

@Injectable()
export class ViewProjector {
	logger: Logger = new Logger("ViewProjector");

	constructor(private aggregateRepository: ClassroomAggregateRepository) {}

	public async queryClassroomView(aggregateId: string): Promise<ClassroomView> {
		return this.aggregateRepository.findById(new ClassroomId(aggregateId)).then((aggregate) => {
			if (this.isAggregateNotNull(aggregate)) {
				return this.mapEntityToView(aggregate);
			} else {
				throw new ClassroomNotFoundException(aggregateId);
			}
		});
	}

	public async queryClassroomViewFromJob(jobId: string): Promise<ClassroomView> {
		return this.aggregateRepository.findByJobId(new Job(jobId)).then((aggregate) => {
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
			.classroomId(aggregate.classroomId.value)
			.courseName(aggregate.courseName.value)
			.students(aggregate.students.map((s) => s.userId.value))
			.teacher(aggregate.teacherId.userId.value)
			.teacherAssistanceList(aggregate.teacherAssistanceList.map((ta) => ta.userId.value))
			.posts(
				aggregate.posts.map((post) =>
					Builder(PostView)
						.postId(post.postId.value)
						.postOwner(post.owner.userId.value)
						.content(post.content.value)
						.comments(
							post.comments.map((comment) => {
								this.logger.debug(comment);
								return Builder(CommentView)
									.commentId(comment.commentId.value)
									.commentOwner(comment.owner.userId.value)
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
				.filter((classroom) => classroom.students.some((student) => student.userId.value === uid))
				.map((classroom) =>
					Builder(ClassroomLiteView).classroomId(classroom.classroomId.value).courseName(classroom.courseName.value).build()
				);
		});
	}

	private getClassroomListByTeacherAssistance(uid: string): Promise<ClassroomLiteView[]> {
		this.logger.log("process get classroomlist");

		return this.aggregateRepository.findAll().then((classroomList) => {
			return classroomList
				.filter((classroom) => classroom.teacherAssistanceList.some((ta) => ta.userId.value === uid))
				.map((classroom) =>
					Builder(ClassroomLiteView).classroomId(classroom.classroomId.value).courseName(classroom.courseName.value).build()
				);
		});
	}

	private getClassroomListByTeacher(uid: string): Promise<ClassroomLiteView[]> {
		return this.aggregateRepository.findAll().then((classroomList) => {
			this.logger.debug(`debug classroomlist -> ${classroomList}`);
			return classroomList
				.filter((classroom) => classroom.teacherId.userId.value === uid)
				.map((classroom) =>
					Builder(ClassroomLiteView).classroomId(classroom.classroomId.value).courseName(classroom.courseName.value).build()
				);
		});
	}
}
