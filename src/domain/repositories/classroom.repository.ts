import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ClassroomDocument, Classroom } from "../aggregate/entities/classroom.root";
import { ClassroomId, Job } from "../aggregate/vos/value-objects";

@Injectable()
export class ClassroomAggregateRepository {
	logger: Logger = new Logger("ClassroomRepository");

	constructor(@InjectModel("classrooms-repository") private classroomModel: Model<ClassroomDocument>) {}

	async findAll(): Promise<Classroom[]> {
		return this.classroomModel.find().exec();
	}

	async findById(id: ClassroomId): Promise<Classroom> {
		return this.classroomModel.findOne({ classroomId: id }).exec();
	}

	async findByJobId(jobId: Job): Promise<Classroom> {
		return this.classroomModel.findOne({ jobId: jobId }).exec();
	}

	async insert(data: Classroom): Promise<Classroom> {
		return this.classroomModel.create(data);
	}

	async update(data: Classroom): Promise<Classroom> {
		return this.classroomModel.findOneAndUpdate({ classroomId: data.classroomId }, data).exec();
	}

	async removeById(id: ClassroomId): Promise<void> {
		this.classroomModel.findOneAndRemove({ classroomId: id }).exec();
	}
}
