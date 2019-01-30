export class Facade<T = { [key: string]: any }> {
	constructor(event: T & { [key: string]: any } = {} as T) {
		this.toJSON = () => {
			return event
		}
	}
	toJSON(): T & { [key: string]: any } {
		return {} as T & { [key: string]: any }
	}
}
