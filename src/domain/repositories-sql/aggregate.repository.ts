import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";
import { Classroom } from "../aggregate-sql/domain.entities";
import { Job } from "../aggregate-sql/value-objects";

@Injectable()
export class ClassroomAggregateRepository {
	logger: Logger = new Logger("ClassroomRepository");

	constructor(@InjectRepository(Classroom) private classroomRepository: Repository<Classroom>) {}

	findAll(): Promise<Classroom[]> {
		return this.classroomRepository.find();
	}

	findById(id: string): Promise<Classroom> {
		return this.classroomRepository.findOne(id, {relations: ["posts"]});
	}

	findByJob(job: Job): Promise<Classroom> {
		return this.classroomRepository.findOne({ where: { job } });
	}

	insert(data: Classroom): Promise<Classroom> {
		return this.classroomRepository.save(data);
	}

	async update(data: Classroom): Promise<any> {
		await this.classroomRepository.update(data.id, data);
	}

	removeById(id: string): Promise<any> {
		return this.classroomRepository.delete(id);
	}
}
