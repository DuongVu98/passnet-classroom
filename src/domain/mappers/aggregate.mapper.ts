export interface IAggregateMapper<AGGREGATE> {
	toAggregate(aggregateId: string): Promise<AGGREGATE>;
}

export interface IEntityMapper<AGGREGATE, ENTITY> {
	toEntity(aggregate: AGGREGATE): Promise<ENTITY>;
}
