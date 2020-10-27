export interface IAggregateMapper<AGGREGATE> {
	toAggregate(aggregateId: string): Promise<AGGREGATE>;
}
