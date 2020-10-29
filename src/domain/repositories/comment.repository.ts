import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommentEntity } from "../entities/comment.entity";
import { EntityRepository } from "./repository.interface";

@Injectable()
export class CommentRepository implements EntityRepository<CommentEntity> {
	constructor(@InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>) {}

	async findAll(): Promise<CommentEntity[]> {
		return await this.commentRepository.find();
	}
	async findById(id: string): Promise<CommentEntity> {
		return await this.commentRepository.findOne({ where: { id: id } });
	}
	async insert(comment: CommentEntity): Promise<CommentEntity> {
		return await this.commentRepository.save(comment);
	}
	async updateById(id: string, data: CommentEntity): Promise<CommentEntity> {
		const comment = await this.commentRepository.findOne({ where: { id: id } });
		if (!comment) {
			throw new HttpException("Not found", HttpStatus.NOT_FOUND);
		}
		return this.commentRepository.save(data);
	}
	async deleteById(id: string): Promise<void> {
		const comment = await this.commentRepository.findOne({ where: { id: id } });
		if (!comment) {
			throw new HttpException("Not found", HttpStatus.NOT_FOUND);
		}
		await this.commentRepository.delete(id);
	}
}
