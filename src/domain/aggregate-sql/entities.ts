import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { CourseName, Job, User } from "./value-objects";
import {Content} from "./value-objects";

@Entity({ name: "classrooms" })
export class Classroom {
	@PrimaryColumn()
	id: string;

    @Column(type => CourseName)
    courseName: CourseName

    @Column(type => User)
    students: User[];

	@Column(type => User)
	teacher: User;

	@Column(type => User)
	teacherAssistanceList: User[];

	@OneToMany(() => Post, post => post.classroom)
	posts: Post[];

	@Column(type => Job)
	job: Job;
}

@Entity({name: "posts"})
export class Post {
    @PrimaryColumn()
    id: string;
    
    @Column(type => Content)
	content: Content;

	@Column(type => User)
	owner: User;

    @OneToMany(() => Comment, comment => comment.post)
	comments: Comment[];

    @ManyToOne(() => Classroom, classroom => classroom.posts)
    classroom: Classroom;
}

@Entity({name: "comments"})
export class Comment {
    @PrimaryColumn()
    id: string;

    @Column(type => Content)
	content: Content;

    @Column(type => User)
	owner: User;

    @ManyToOne(() => Post, post => post.comments)
    post: Post
}
