export interface EntityRepository<T> {
	findAll(): Promise<T[]>;
	findById(id: string): Promise<T>;
	insert(t: T): Promise<T>;
	updateById(id: string, t: T): Promise<void>;
	deleteById(id: string): Promise<void>;
}
