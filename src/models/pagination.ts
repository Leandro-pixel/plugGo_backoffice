export class Pagination {
	constructor (
		public sortBy: string = 'id',
		public descending: boolean = false,
		public page: number = 1,
		public rowsPerPage: number = 10,
		public rowsNumber: number = 0
	) {}
}
