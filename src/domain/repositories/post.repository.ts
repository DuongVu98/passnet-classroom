import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostEntity } from "../entities/post.entity";
import { EntityRepository } from "./repository.interface";

@Injectable()
export class PostRepository implements EntityRepository<PostEntity> {
	constructor(@InjectRepository(PostEntity) private classroomRepository: Repository<PostEntity>) {}

	findAll(): Promise<PostEntity[]> {
		throw new Error("Method not implemented.");
	}
	findById(id: string): Promise<PostEntity> {
		throw new Error("Method not implemented.");
	}
	insert(post: PostEntity): Promise<PostEntity> {
		throw new Error("Method not implemented.");
	}
	updateById(id: string, t: PostEntity): Promise<void> {
		throw new Error("Method not implemented.");
	}
	deleteById(id: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
