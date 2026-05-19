interface ErrorHandler {
  setNext(handler: ErrorHandler): ErrorHandler;
  handle(statusCode: string): void;
}

/**
* A simple implementation of the chain of responsibility pattern
* so that we can handle errors in a more organized way.
* For better understanding, see the following link:
* https://refactoring.guru/design-patterns/chain-of-responsibility
*/
export abstract class AbstractErrorHandler implements ErrorHandler {
private nextHandler: ErrorHandler | null = null

public setNext (handler: ErrorHandler): ErrorHandler {
  this.nextHandler = handler
  return handler
}

public handle (statusCode: string): void {
  if (this.nextHandler) this.nextHandler.handle(statusCode)
  throw new Error('Erro interno')
}

protected abstract process(statusCode: string): Error | null;
}
