import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { CourseName, Job, User } from "./value-objects";
import { Content } from "./value-objects";

const serialKey = "serialize";
export const GetterDefault: ({ defaultValue }: { defaultValue: string | number | boolean | Array<any> }) => PropertyDecorator = ({
	defaultValue,
}) => {
	return function (target, propertyKey) {
		if (typeof propertyKey === "string") {
			const newSym = Symbol(propertyKey);
			return {
				get: function (this: any) {
					const defaultVal = this[serialKey] && !this[newSym] && defaultValue;
					return defaultVal || this[newSym];
				},
				set: function (this: any, value: any) {
					this[newSym] = value;
				},
				enumerable: true,
				configurable: true,
				writeable: true,
			};
		}
	};
};

@Entity({ name: "classrooms" })
export class Classroom {
	@PrimaryGeneratedColumn()
	id: string;

	@Column((type) => CourseName, { prefix: "course_name" })
	courseName: CourseName;

	@OneToMany(() => Member, (member) => member)
	students: Member[];

	@Column((type) => User, { prefix: "teacher" })
	teacher: User;

	@OneToMany(() => Member, (member) => member)
	teacherAssistanceList: Member[];

	@GetterDefault({ defaultValue: [] })
	@OneToMany(() => Post, (post) => post.classroom, { cascade: true, eager: true })
	posts: Post[];

	@Column((type) => Job, { prefix: "job" })
	job: Job;

	addStudentToClassroom(student: Member) {
		this.students.push(student);
	}

	addPost(post: Post) {
		this.posts.push(post);
	}

	addCommentToPost(comment: Comment, post: Post) {
		let targetPost = this.posts.filter((p) => p.id === post.id)[0];
		targetPost.comments.push(comment);
	}
}

@Entity({ name: "posts" })
export class Post {
	@PrimaryColumn()
	id: string;

	@Column((type) => Content, { prefix: "content" })
	content: Content;

	@Column((type) => User, { prefix: "owner" })
	owner: User;

	@OneToMany(() => Comment, (comment) => comment.post, { cascade: ["insert", "update", "remove"], eager: true })
	comments: Comment[];

	@JoinColumn({ name: "classroom_id" })
	@ManyToOne(() => Classroom, (classroom) => classroom.posts)
	classroom: Classroom;
}

@Entity({ name: "comments" })
export class Comment {
	@PrimaryColumn()
	id: string;

	@Column((type) => Content, { prefix: "content" })
	content: Content;

	@Column((type) => User, { prefix: "owner" })
	owner: User;

	@JoinColumn({ name: "post_id" })
	@ManyToOne(() => Post, (post) => post.comments)
	post: Post;
}

@Entity({ name: "member" })
export class Member {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ name: "uid" })
	uid: string;
}
