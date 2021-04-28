import { Injectable, Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { Classroom } from "src/domain/aggregate/classroom.root";
import { ClassroomId } from "src/domain/aggregate/vos/classroom-id.vo";
import { JobId } from "src/domain/aggregate/vos/job-id.vo";
import { UserId, UserIdDomain } from "src/domain/aggregate/vos/user-id.vos";
import { ClassroomNotCreatedException, ClassroomNotFoundException } from "src/domain/exceptions/exceptions";
import { ClassroomAggregateRootRepository } from "src/domain/repositories/classroom.repository";
import { ClassroomLiteView, ClassroomView, CommentView, PostView } from "src/domain/views/views";

@Injectable()
export class ViewProjector {
	logger: Logger = new Logger("ViewProjector");

	constructor(private aggregateRepository: ClassroomAggregateRootRepository) {}

	public async queryClassroomView(aggregateId: string): Promise<ClassroomView> {
		const idToFind = new ClassroomId(aggregateId);

		return this.aggregateRepository.findById(idToFind).then((aggregate) => {
			if (this.isAggregateNotNull(aggregate)) {
				return this.mapEntityToView(aggregate);
			} else {
				throw new ClassroomNotFoundException(aggregateId);
			}
		});
	}

	public async queryClassroomViewFromJob(jobId: string): Promise<ClassroomView> {
		return this.aggregateRepository.findByJobId(new JobId(jobId)).then((aggregate) => {
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
			.classroomId(aggregate.id.getId.toHexString())
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
							post.comments.map((comment) => {
								this.logger.debug(comment);
								return Builder(CommentView)
									.commentId(comment.commentId._id)
									.commentOwner(comment.commentOwner._id)
									.content(comment.content.content)
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
				.filter((classroom) => classroom.students.some((student) => new UserIdDomain(student).equals(new UserId(uid))))
				.map((classroom) =>
					Builder(ClassroomLiteView).classroomId(classroom.id.getId.toHexString()).courseName(classroom.courseName.name).build()
				);
		});
	}

	private getClassroomListByTeacherAssistance(uid: string): Promise<ClassroomLiteView[]> {
		this.logger.log("process get classroomlist");

		return this.aggregateRepository.findAll().then((classroomList) => {
			return classroomList
				.filter((classroom) => classroom.teacherAssistanceList.some((ta) => new UserIdDomain(ta).equals(new UserId(uid))))
				.map((classroom) =>
					Builder(ClassroomLiteView).classroomId(classroom.id.getId.toHexString()).courseName(classroom.courseName.name).build()
				);
		});
	}

	private getClassroomListByTeacher(uid: string): Promise<ClassroomLiteView[]> {
		return this.aggregateRepository.findAll().then((classroomList) => {
			return classroomList
				// .filter((classroom) => new UserIdDomain(classroom.teacherId).equals(new UserId(uid)))
                .filter((classroom) => classroom.teacherId.equals(new UserId(uid)))
				.map((classroom) =>
					Builder(ClassroomLiteView).classroomId(classroom.id.getId.toHexString()).courseName(classroom.courseName.name).build()
				);
		});
	}
}
