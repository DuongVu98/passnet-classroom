export class Aggregate {
	aggregateRootIdentifier: string;

	withAggregateRooTidentifier(id: string): Aggregate {
		this.aggregateRootIdentifier = id;
		return this;
	}
}
