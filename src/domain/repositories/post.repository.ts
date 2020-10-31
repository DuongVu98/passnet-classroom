import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostEntity } from "../entities/post.entity";
import { EntityRepository } from "./repository.interface";

@Injectable()
export class PostRepository implements EntityRepository<PostEntity> {
	constructor(@InjectRepository(PostEntity) private postRepository: Repository<PostEntity>) {}

	async findAll(): Promise<PostEntity[]> {
		return this.postRepository.find();
	}
	async findById(id: string): Promise<PostEntity> {
		return this.postRepository.findOne({ where: { id: id }, relations: ["postOwner", "comments"] });
	}
	async insert(post: PostEntity): Promise<PostEntity> {
		return await this.postRepository.save(post);
	}
	async updateById(id: string, data: PostEntity): Promise<PostEntity> {
		const post = await this.postRepository.findOne({ where: { id: id } });
		if (!post) {
			throw new HttpException("Not found", HttpStatus.NOT_FOUND);
		}
		return this.postRepository.save(data);
	}
	async deleteById(id: string): Promise<void> {
		const post = await this.postRepository.findOne({ where: { id: id } });
		if (!post) {
			throw new HttpException("Not found", HttpStatus.NOT_FOUND);
		}
		await this.postRepository.delete(id);
	}
}
