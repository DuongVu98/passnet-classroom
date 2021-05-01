import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "../aggregate/domain.entities";

@Injectable()
export class CommentEntityRepository {
	constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) {}

	findComment(id: string): Promise<Comment> {
		return this.commentRepository.findOne({ where: { id } });
	}

	insertComment(comment: Comment): Promise<Comment> {
		return this.commentRepository.save(comment);
	}

	updateComment(comment: Comment): Promise<any> {
		return this.commentRepository.update(comment.id, comment);
	}

	deleteComment(id: string): Promise<void> {
		return this.commentRepository.findOne({ where: { id } }).then((comment) => {
			this.commentRepository.delete(comment);
		});
	}
}
