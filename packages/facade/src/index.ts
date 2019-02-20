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
	constructor(properties: T & { [key: string]: any } = {} as T) {
		let p = properties

		if (typeof p !== 'object' || p == null) {
			p = {} as T & { [key: string]: any }
		}

		this.toJSON = () => {
			return p
		}
	}
	toJSON(): T & { [key: string]: any } {
		return {} as T & { [key: string]: any }
	}
}
