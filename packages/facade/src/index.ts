class Enforcer {
	stringOrNumber<T>(property: T): T | undefined {
		if (this.string(property) || this.number(property)) {
			return property
		}
	}

	string<T>(property: T): T | undefined {
		if (typeof property === 'string') {
			return property
		}
	}

	number<T>(property: T): T | undefined {
		if (typeof property === 'number') {
			return property
		}
	}
}

export class Facade<T = { [key: string]: any }> {
	protected enforce = new Enforcer()
	constructor(event: T & { [key: string]: any } = {} as T) {
		this.toJSON = () => {
			return event
		}
	}
	toJSON(): T & { [key: string]: any } {
		return {} as T & { [key: string]: any }
	}
}
