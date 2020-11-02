import { Content } from "../vos/content.vo";
import { PostId } from "../vos/post-id.vo";
import { Student } from "./student.entity";
import { Teacher } from "./teacher.entity";

export class Post {
	postId: PostId;
	content: Content;
	postOwner: Student | Teacher;
	comments: Comment[];
}
