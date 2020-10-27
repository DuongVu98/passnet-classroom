import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ClassroomView } from "../views/classroom.view";

@Injectable()
export class ClassroomViewRepository {
	constructor(@InjectModel("classroom_views") private viewModel: Model<ClassroomView>) {}

	async findById(id: string): Promise<ClassroomView> {
		return this.viewModel.findById(id);
	}

	async insert(view: ClassroomView): Promise<ClassroomView> {
		return new this.viewModel(view).save();
	}

	async update(id: string, newView: ClassroomView): Promise<ClassroomView> {
		return this.viewModel.findByIdAndUpdate(id, newView, { new: true });
	}

	async delete(id: string): Promise<any> {
		return await this.viewModel.findByIdAndRemove(id);
	}
}
