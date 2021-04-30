import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Classroom } from "../aggregate-sql/entities";
import { Job } from "../aggregate-sql/value-objects";

@Injectable()
export class ClassroomRepository {
	logger: Logger = new Logger("ClassroomRepository");

	constructor(@InjectRepository(Classroom) private readonly classroomRepository: Repository<Classroom>) {}

	findAll(): Promise<Classroom[]> {
		return this.classroomRepository.find();
	}

	findById(id: string): Promise<Classroom> {
		return this.classroomRepository.findOne(id);
	}

	findByJob(job: Job): Promise<Classroom> {
		return this.classroomRepository.findOne({ where: { job } });
	}

	insert(data: Classroom): Promise<Classroom> {
		return this.classroomRepository.save(data);
	}

	update(data: Classroom): Promise<any> {
		return this.classroomRepository.update(data.id, data);
	}

	removeById(id: string): Promise<any> {
		return this.classroomRepository.delete(id);
	}
}

@Injectable()
export class TestRepository {

}
