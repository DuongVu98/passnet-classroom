import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "../aggregate/domain.entities";

@Injectable()
export class PostEntityRepository {
	constructor(@InjectRepository(Post) private readonly postRepository: Repository<Post>) {}

	findPost(id: string): Promise<Post> {
		return this.postRepository.findOne({ where: { id } });
	}

	insertPost(post: Post): Promise<Post> {
		return this.postRepository.save(post);
	}

	updatePost(post: Post): Promise<any> {
		return this.postRepository.update(post.id, post);
	}

	removePost(id: string): Promise<void> {
		return this.postRepository.findOne({ where: { id } }).then((post) => {
			this.postRepository.delete(post);
		});
	}
}
