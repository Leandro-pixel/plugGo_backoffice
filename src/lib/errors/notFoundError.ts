import { AbstractErrorHandler } from '../abstractHandler'

export class NotFoundErrorHandler extends AbstractErrorHandler {
	protected process (statusCode: string): Error | null {
		if (statusCode === '404') {
			throw new NotFoundError('Não encontrado')
		}
		return null
	}

	public handle (statusCode: string): void {
		this.process(statusCode)
		super.handle(statusCode)
	}
}

export class NotFoundError extends Error {
	constructor (message = 'Não encontrado') {
		super(message)
		this.name = 'NotFoundError'

		Object.setPrototypeOf(this, NotFoundError.prototype)
	}
}
