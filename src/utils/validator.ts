import { cnpj, cpf } from 'cpf-cnpj-validator'
import { Formatter } from './formatter'

export class Validator {
	static hasMultipleWords = (value: string): boolean => {
		value = Formatter.clearNumbers(value)
		return value.split(' ').length > 1
	}

	static isValidCPF = (value: string): boolean => {
		return cpf.isValid(value)
	}

	static isValidPhoneNumber = (value: string): boolean => {
		const formattedValue = Formatter.clearSymbolsAndLetters(value)
		return /^([14689][0-9]|2[12478]|3([1-5]|[7-8])|5([13-5])|7[193-7])9[0-9]{8}$/.test(formattedValue)
	}

	static isValidEmail = (value: string): boolean => {
		return /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
	}

	static isValidPassword = (value: string): boolean => {
		return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[a-zA-Z]).{8,}$/.test(value)
	}

  static isValidPassword2 = (value: string): boolean => {
		return value != null;
	}

	static isValidCNPJ = (value: string): boolean => {
		return cnpj.isValid(value)
	}


	static isValidName = (name: string): boolean => {
		return /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(name)
	}

	static isValidNumber = (value: string): boolean => {
		return /^[0-9]+$/.test(value)
	}
}
