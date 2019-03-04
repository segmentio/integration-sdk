import _ from '../../utils'

class Enforcer {
	stringOrNumber<T extends (string | number) | undefined>(property: T): T | undefined {
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

		if (!_.isPlainObject(properties)) {
			p = {} as T & { [key: string]: any }
		}

		// Freeze the raw properties object to ensure immutability.
		Object.freeze(p)

		this.getProperties = () => {
			return properties
		}

		this.toJSON = () => {
			return _.cloneDeep(p) as { [key: string]: any }
		}
	}

	// getProperties should be used by internal Facade getters/setters to access member values.
	// It returns a pointer to the raw properties dictionary and must be treated as immutable.
	protected getProperties(): Readonly<T & { [key: string]: any }> {
		return {} as Readonly<T & { [key: string]: any }>
	}

	// toJSON should be used by external consumers of the Facade instance.
	// It returns a deep clone of the member values and can be safely mutated if necessary.
	// It provides no garauntees about the shape and structure of the returned object.
	public toJSON(): { [key: string]: any } {
		return {} as { [key: string]: any }
	}
}
