import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ClassroomAggregateDocument, ClassroomAggregateRoot } from "../aggregate/classroom.root";
import { ClassroomId } from "../aggregate/vos/classroom-id.vo";
import { JobId } from "../aggregate/vos/job-id.vo";

@Injectable()
export class ClassroomAggregateRootRepository {
	logger: Logger = new Logger("ClassroomRepository");

	constructor(@InjectModel("classrooms-repository") private classroomModel: Model<ClassroomAggregateDocument>) {}

	async findAll(): Promise<ClassroomAggregateRoot[]> {
		return this.classroomModel.find();
	}

	async findById(id: ClassroomId): Promise<ClassroomAggregateRoot> {
		return this.classroomModel.findById(id);
	}

    async findByJobId(jobId: JobId): Promise<ClassroomAggregateRoot> {
        return this.classroomModel.findOne({jobId: jobId});
    }

	async insert(data: ClassroomAggregateRoot): Promise<ClassroomAggregateRoot> {
		return this.classroomModel.create(data);
	}

	async updateById(data: ClassroomAggregateRoot, id: ClassroomId): Promise<ClassroomAggregateRoot> {
		return this.classroomModel.findByIdAndUpdate(id, data);
	}

	async removeById(id: ClassroomId): Promise<void> {
		this.classroomModel.findByIdAndRemove(id);
	}
}
