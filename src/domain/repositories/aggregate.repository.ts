import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Classroom } from "../aggregate/domain.entities";
import { Job } from "../aggregate/value-objects";

@Injectable()
export class ClassroomAggregateRepository {
	logger: Logger = new Logger("ClassroomRepository");

	constructor(@InjectRepository(Classroom) private classroomRepository: Repository<Classroom>) {}

	findAll(): Promise<Classroom[]> {
		return this.classroomRepository.find();
	}

	findClassroom(id: string): Promise<Classroom> {
		return this.classroomRepository.findOne(id, { relations: ["posts"] });
	}

	findClassroomByJob(job: Job): Promise<Classroom> {
		return this.classroomRepository.findOne({ where: { job } });
	}

	insertClassroom(data: Classroom): Promise<Classroom> {
		return this.classroomRepository.save(data);
	}

	async updateClassroom(data: Classroom): Promise<any> {
		await this.classroomRepository.update(data.id, data);
	}

	removeClassroom(id: string): Promise<any> {
		return this.classroomRepository.delete(id);
	}
}
