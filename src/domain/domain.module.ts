import { Module } from "@nestjs/common";
import { ClassroomRepository } from "./repositories/classroom.repository";
import { CommentRepository } from "./repositories/comment.repository";
import { PostRepository } from "./repositories/post.repository";
import { UserRepository } from "./repositories/user.repository";

@Module({
    providers: [
        {
            provide: "classroom-repository",
            useValue: ClassroomRepository
        },
        {
            provide: "user-repository",
            useValue: UserRepository
        },
        {
            provide: "post-repository",
            useValue: PostRepository
        },
        {
            provide: "comment-repository",
            useValue: CommentRepository
        },
    ]
})
export class DomainModule {}
