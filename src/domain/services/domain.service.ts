import { Injectable, Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { Classroom, Member, Post } from "../aggregate/domain.entities";
import { ClassroomAggregateRepository } from "../repositories/aggregate.repository";
import { CommentEntityRepository } from "../repositories/comment.repository";
import { MemberEntityRepository } from "../repositories/member.repository";
import { PostEntityRepository } from "../repositories/post.repository";

@Injectable()
export class DomainService {
    
	logger: Logger = new Logger("DomainService");

	constructor(
		private classroomRepository: ClassroomAggregateRepository,
		private postRepository: PostEntityRepository,
		private commentRepository: CommentEntityRepository,
		private memberRepository: MemberEntityRepository
	) {}

	addStudentToClassroom(classroomId: string, student: Member): Promise<any> {
		return this.classroomRepository.findClassroom(classroomId).then((classroom) => {
			return this.memberRepository
				.findMemberByUid(student.uid)
				.then((student) => {
					return { classroom, student };
				})
				.then((values) => {
					values.classroom.students.push(student);
					values.student.classrooms.push(classroom);

					this.memberRepository.updateMember(student);
					this.classroomRepository.updateClassroom(classroom);
				})
                .catch(error => {
                    this.logger.error(`error from addStudentToClassroom() -> ${error}`)
                });
		});
	}

	addPost(classroomId: string, post: Post) {
		return this.classroomRepository.findClassroom(classroomId).then((classroom) => {
			post.classroom = classroom;
			classroom.posts.push(post);

			this.postRepository.insertPost(post);
			this.classroomRepository.updateClassroom(classroom);
		});
	}

	addCommentToPost(comment: Comment, postId: string) {
	}
}
