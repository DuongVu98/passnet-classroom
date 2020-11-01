import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ClassroomView, ClassroomViewDto } from "../views/classroom.view";

@Injectable()
export class ClassroomViewRepository {
	logger: Logger = new Logger("ClassroomViewRepository");

	constructor(@InjectModel("classroom_views") private viewModel: Model<ClassroomView>) {}

	async findById(id: string): Promise<ClassroomView> {
		return this.viewModel.findOne({ classroomId: id }).exec();
    }
    
    async findByPostId(id: string): Promise<ClassroomView> {
        return this.viewModel.aggregate([
            {
                $unwind: "posts"
            },
            {
                $match: {
                    postId: id
                }
            },
        ]).exec();
    }

	async insert(view: ClassroomViewDto): Promise<ClassroomView> {
		return new this.viewModel(view).save();
	}

	async update(id: string, newView: ClassroomViewDto): Promise<ClassroomView> {
		let view = null;
		await this.viewModel
			.findOne({ classroomId: id })
			.exec()
			.then((view) => {
				if (view) {
					return this.viewModel.findByIdAndUpdate(view._id, newView, { new: true }).exec();
				}
			})
			.then((updatedView) => {
				view = updatedView;
			})
			.catch((error) => {
				this.logger.error(`error when update view --> ${error}`);
				throw new HttpException("view not found", HttpStatus.NOT_FOUND);
			});

		return view;
	}

	async delete(id: string): Promise<any> {
		return await this.viewModel.findByIdAndRemove(id);
	}
}
