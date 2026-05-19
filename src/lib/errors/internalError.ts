import { AbstractErrorHandler } from '../abstractHandler'

export class InternalErrorHandler extends AbstractErrorHandler {
	protected process (statusCode: string): Error | null {
		if (statusCode === '500') {
			throw new InternalError('Ocorreu um erro inesperado. Tente novamente mais tarde.')
		}
		return null
	}

	public handle (statusCode: string): void {
		this.process(statusCode)
		super.handle(statusCode)
	}
}

export class InternalError extends Error {
	constructor (message = 'Ocorreu um erro inesperado. Tente novamente mais tarde.') {
		super(message)
		this.name = 'InternalError'

		Object.setPrototypeOf(this, InternalError.prototype)
	}
}
