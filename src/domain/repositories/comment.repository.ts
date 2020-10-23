import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommentEntity } from "../entities/comment.entity";
import { EntityRepository } from "./repository.interface";

@Injectable()
export class CommentRepository implements EntityRepository<CommentEntity> {
	constructor(@InjectRepository(CommentEntity) private classroomRepository: Repository<CommentEntity>) {}

	findAll(): Promise<CommentEntity[]> {
		throw new Error("Method not implemented.");
	}
	findById(id: string): Promise<CommentEntity> {
		throw new Error("Method not implemented.");
	}
	insert(t: CommentEntity): Promise<CommentEntity> {
		throw new Error("Method not implemented.");
	}
	updateById(id: string, t: CommentEntity): Promise<void> {
		throw new Error("Method not implemented.");
	}
	deleteById(id: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
