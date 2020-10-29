import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ClassroomEntity } from "../entities/classroom.entity";
import { EntityRepository } from "./repository.interface";

@Injectable()
export class ClassroomRepository implements EntityRepository<ClassroomEntity> {
	logger: Logger = new Logger("ClassroomRepository");

	constructor(@InjectRepository(ClassroomEntity) private classroomRepository: Repository<ClassroomEntity>) {}

	async findAll(): Promise<ClassroomEntity[]> {
		return this.classroomRepository.find();
	}

	async findById(id: string): Promise<ClassroomEntity> {
		return this.classroomRepository.findOne({
			where: { id: id },
			relations: ["posts", "teacher", "students", "teacherAssistances"],
		});
	}
	async insert(data: ClassroomEntity): Promise<ClassroomEntity> {
		return this.classroomRepository.save(data);
	}
	async updateById(id: string, data: ClassroomEntity): Promise<ClassroomEntity> {
		const classroom = await this.classroomRepository.findOne({ where: { id: id } });
		if (!classroom) {
			throw new HttpException("Not found", HttpStatus.NOT_FOUND);
        }
        return this.classroomRepository.save(data);
	}

	async deleteById(id: string): Promise<void> {
		const classroom = await this.classroomRepository.findOne({ where: { id: id } });
		if (!classroom) {
			throw new HttpException("Not found", HttpStatus.NOT_FOUND);
		}
		this.classroomRepository.delete(id);
	}
}
