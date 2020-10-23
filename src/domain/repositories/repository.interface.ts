export interface EntityRepository<T> {
    findAll(): Promise<T[]>;
    findById(): Promise<T>;
    insert(): Promise<T>;
    updateById(): Promise<void>;
    deleteById(): Promise<void>;
}