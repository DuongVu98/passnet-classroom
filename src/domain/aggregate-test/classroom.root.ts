import { Post } from "./entities/post.entity";
import { Student } from "./entities/student.entity";
import { Teacher } from "./entities/teacher.entity";
import { ClassroomId } from "./vos/classroom-id.vo";
import { CourseName } from "./vos/course-name.vo";

export class ClassroomAggregateRoot {
	classroomId: ClassroomId;
	courseName: CourseName;
	students: Student[];
	teacherId: Teacher;
	teacherAssistances: Student[];
	posts: Post[];

	public addPost(post: Post): void {
		this.posts.push(post);
	}

	public addCommentToPost(comment: Comment, post: Post): void {
		this.posts.map((currentPost) => {
			if (currentPost.postId === post.postId) {
				currentPost.comments.push(comment);
			}
			return currentPost;
		});
	}

	public addStudentToClass(student: Student): void {
		this.students.push(student);
	}
}
