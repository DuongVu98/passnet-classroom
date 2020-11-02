import { StudentView } from "./student.view";

export class CommentView {
    commentId: string;
    commentOwner: StudentView;
    content: string;
    
    withId(id: string): CommentView {
        this.commentId = id;
        return this;
    }
    withCommentOwner(owner: StudentView): CommentView {
        this.commentOwner = owner;
        return this;
    }
    withContent(content: string): CommentView{
        this.content = content;
        return this;
    }
}
