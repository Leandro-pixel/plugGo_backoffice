import { AbstractErrorHandler } from '../abstractHandler'

export class BadRequestErrorHandler extends AbstractErrorHandler {
	protected process (statusCode: string): Error | null {
		if (statusCode === '400') {
			throw new BadRequestError('Requisição inválida')
		}
		return null
	}

	public handle (statusCode: string): void {
		this.process(statusCode)
		super.handle(statusCode)
	}
}

export class BadRequestError extends Error {
	constructor (message = 'Requisição inválida') {
		super(message)
		this.name = 'BadRequestError'

		Object.setPrototypeOf(this, BadRequestError.prototype)
	}
}
