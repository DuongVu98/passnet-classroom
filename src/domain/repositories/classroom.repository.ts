import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ClassroomDocument, Classroom } from "../aggregate/entities/classroom.root";
import { Job } from "../aggregate/vos/value-objects";

@Injectable()
export class ClassroomAggregateRepository {
	logger: Logger = new Logger("ClassroomRepository");

	constructor(@InjectModel("classrooms-repository") private classroomModel: Model<ClassroomDocument>) {}

	async findAll(): Promise<Classroom[]> {
		return this.classroomModel.find();
	}

	async findById(id: string): Promise<Classroom> {
		return this.classroomModel.findById(id);
	}

	async findByJobId(jobId: Job): Promise<Classroom> {
		return this.classroomModel.findOne({ jobId: jobId });
	}

	async insert(data: Classroom): Promise<Classroom> {
		return this.classroomModel.create(data);
	}

	async update(data: Classroom): Promise<Classroom> {
		return this.classroomModel.findOneAndUpdate(data);
	}

	async removeById(id: string): Promise<void> {
		this.classroomModel.findByIdAndRemove(id);
	}
}
