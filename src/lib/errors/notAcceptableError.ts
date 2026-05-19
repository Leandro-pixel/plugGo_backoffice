import { AbstractErrorHandler } from '../abstractHandler'

export class NotAcceptableErrorHandler extends AbstractErrorHandler {
	protected process (statusCode: string): Error | null {
		if (statusCode === '406') {
			throw new NotAcceptableError('Não aceitável')
		}
		return null
	}

	public handle (statusCode: string): void {
		this.process(statusCode)
		super.handle(statusCode)
	}
}

export class NotAcceptableError extends Error {
	constructor (message = 'Não aceitável') {
		super(message)
		this.name = 'NotAcceptableError'

		Object.setPrototypeOf(this, NotAcceptableError.prototype)
	}
}
