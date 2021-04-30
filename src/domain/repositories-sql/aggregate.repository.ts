import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Builder } from "builder-pattern";
import { getRepository, Repository } from "typeorm";
import { Classroom, Post } from "../aggregate-sql/domain.entities";
import { Content, Job, User } from "../aggregate-sql/value-objects";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class ClassroomAggregateRepository {
	logger: Logger = new Logger("ClassroomRepository");

	constructor(@InjectRepository(Classroom) private classroomRepository: Repository<Classroom>, @InjectRepository(Post) private postRepository: Repository<Post>) {}

	findAll(): Promise<Classroom[]> {
		return this.classroomRepository.find();
	}

	findById(id: string): Promise<Classroom> {
		return this.classroomRepository.findOne(id, { relations: ["posts"] });
	}

	findByJob(job: Job): Promise<Classroom> {
		return this.classroomRepository.findOne({ where: { job } });
	}

	insert(data: Classroom): Promise<Classroom> {
		return this.classroomRepository.save(data);
	}

	async update(data: Classroom): Promise<any> {
        const post: Post = Builder(Post)
					.id(uuidv4())
					.comments([])
					.content(new Content("dumbContent"))
					.owner(new User("dumbUser"))
					.build();
        await this.postRepository.save(post)
		await this.classroomRepository.update(data.id, data);
	}

	removeById(id: string): Promise<any> {
		return this.classroomRepository.delete(id);
	}
}

