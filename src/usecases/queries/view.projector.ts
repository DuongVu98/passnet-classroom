import { Injectable, Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { Classroom } from "src/domain/aggregate/entities/classroom.root";
import { ClassroomId, Job, ProfileId, Role } from "src/domain/aggregate/vos/value-objects";
import { ClassroomNotCreatedException, ClassroomNotFoundException } from "src/domain/exceptions/exceptions";
import { ClassroomAggregateRepository } from "src/domain/repositories/classroom.repository";
import { ClassroomLiteView, ClassroomView, CommentView, MemberView, PostView } from "src/domain/views/views";

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
			.students(aggregate.members.filter((mem) => mem.role === Role.STUDENT).map((mem) => mem.profileId.value))
			.assistants(aggregate.members.filter((mem) => mem.role === Role.ASSISTANT).map((mem) => mem.profileId.value))
			.teacher(aggregate.members.find((mem) => mem.role === Role.LECTURER).profileId.value)
			.code(aggregate.classCode.value)
			.posts(
				aggregate.posts.map((post) =>
					Builder(PostView)
						.postId(post.postId.value)
						.postOwner(post.owner.profileId.value)
						.content(post.content.value)
						.comments(
							post.comments.map((comment) => {
								this.logger.debug(comment);
								return Builder(CommentView)
									.commentId(comment.commentId.value)
									.commentOwner(comment.owner.profileId.value)
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
			case Role.STUDENT.toString():
				return this.getClassroomListByStudent(uid);
			case Role.ASSISTANT.toString():
				return this.getClassroomListByAssistant(uid);
			case Role.LECTURER.toString():
				return this.getClassroomListByTeacher(uid);
		}
	}

	private getClassroomListByStudent(uid: string): Promise<ClassroomLiteView[]> {
		return this.aggregateRepository.findAll().then((classroomList) => {
			return classroomList
				.filter((classroom) => classroom.members.some((student) => student.profileId.value === uid && student.role == Role.STUDENT))
				.map((classroom) =>
					Builder(ClassroomLiteView).classroomId(classroom.classroomId.value).courseName(classroom.courseName.value).build()
				);
		});
	}

	private getClassroomListByAssistant(uid: string): Promise<ClassroomLiteView[]> {
		return this.aggregateRepository.findAll().then((classroomList) => {
			return classroomList
				.filter((classroom) => classroom.members.some((ta) => ta.profileId.value === uid && ta.role == Role.ASSISTANT))
				.map((classroom) =>
					Builder(ClassroomLiteView).classroomId(classroom.classroomId.value).courseName(classroom.courseName.value).build()
				);
		});
	}

	private getClassroomListByTeacher(uid: string): Promise<ClassroomLiteView[]> {
		return this.aggregateRepository.findAll().then((classroomList) => {
			this.logger.debug(`debug classroomlist -> ${classroomList}`);
			return classroomList
				.filter((classroom) => classroom.members.filter((mem) => mem.profileId.value === uid).length > 0)
				.map((classroom) =>
					Builder(ClassroomLiteView).classroomId(classroom.classroomId.value).courseName(classroom.courseName.value).build()
				);
		});
	}

	getClassroomMembers(classroomId: string): Promise<MemberView[]> {
		return this.aggregateRepository
			.findById(new ClassroomId(classroomId))
			.then((aggregate) => aggregate.members)
			.then((members) => {
				return members.map((mem) => {
					return {
						profileId: mem.profileId.value,
						role: mem.role.toString(),
					};
				});
			});
	}
}
