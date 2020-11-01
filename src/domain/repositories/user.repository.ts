import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { EntityRepository } from "./repository.interface";

@Injectable()
export class UserRepository implements EntityRepository<UserEntity> {
	logger: Logger = new Logger("UserRepository");

	constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

	async findAll(): Promise<UserEntity[]> {
		return this.userRepository.find();
	}
	async findById(id: string): Promise<UserEntity> {
		let user;
		await this.userRepository
			.findOne({ where: { uid: id } })
			.then((foundUser) => {
				user = foundUser;
			}).catch(error => Promise.reject(error))
		if (user) {
			return user;
		} else {
			const exception = new HttpException("Not Found", HttpStatus.NOT_FOUND);
			return Promise.reject(exception);
		}
	}
	async insert(user: UserEntity): Promise<UserEntity> {
		return await this.userRepository.save(user);
	}
	async updateById(id: string, data: UserEntity): Promise<UserEntity> {
		const user = await this.userRepository.findOne({ where: { uid: id } });
		if (!user) {
			throw new HttpException("Not found", HttpStatus.NOT_FOUND);
		}
		return await this.userRepository.save(data);
	}
	async deleteById(id: string): Promise<void> {
		const user = await this.userRepository.findOne({ where: { uid: id } });
		if (!user) {
			throw new HttpException("Not found", HttpStatus.NOT_FOUND);
		}
		await this.userRepository.delete(id);
	}
}
