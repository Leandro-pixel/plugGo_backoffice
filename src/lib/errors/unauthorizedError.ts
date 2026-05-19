import { AbstractErrorHandler } from '../abstractHandler'

export class UnauthorizedErrorHandler extends AbstractErrorHandler {
	protected process (statusCode: string): Error | null {
		if (statusCode === '401') {
			throw new UnauthorizedError('Não autorizado')
		}
		return null
	}

	public handle (statusCode: string): void {
		this.process(statusCode)
		super.handle(statusCode)
	}
}

export class UnauthorizedError extends Error {
	constructor (message = 'Não autorizado/Credenciais inválidas') {
		super(message)
		this.name = 'UnauthorizedError'

		Object.setPrototypeOf(this, UnauthorizedError.prototype)
	}
}
