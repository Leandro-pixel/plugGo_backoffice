import { Formatter } from 'src/utils/formatter'
import { Validator } from 'src/utils/validator'

export class ECCustomer {
  constructor(
    public id: number = 0,
    public userId: number = 0,
    public establishmentId: number = 0,
    public creditBalance: string = '',
    public userName: string = '',
    public userType: string = 'client',
    public establishmentName: string = '',
    public createdAt: string = '',
    public updatedAt: string = ''
  ) {}

  public toString(): string {
    return `${this.userName}, ${this.userType}, ${this.establishmentName}, ${this.createdAt}, ${this.updatedAt}`;
  }

  static fromJson(json: any): ECCustomer {
    return new ECCustomer(
      json.id || 0,
      json.userId || 0,
      json.establishmentId || 0,
      json.creditBalance || '',
      json.userName || '',
      json.userType || 'client',
      json.establishmentName || '',
      json.createdAt || '',
      json.updatedAt || ''
    );
  }

  public toJson(): any {
    return {
      id: this.id,
      userId: this.userId,
      establishmentId: this.establishmentId,
      creditBalance: this.creditBalance,
      userName: this.userName,
      userType: this.userType,
      establishmentName: this.establishmentName,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  public isValid(): boolean {
    // Validação adicional pode ser aplicada conforme necessário.
    return this.userName !== '' && this.creditBalance !== '';
  }
}


export class CustomerBrands {
	constructor (
		public id = 0,
		public userType = '',
		public name = '',
		public cpf = '',
		public rg = '',
		public currentBalance = '0.00',
		public birthDate: string | null = null,
		public gender: string | null = null,
		public email: string | null = '',
		public phone: string | null = '',
		public fatherName: string | null = null,
		public motherName: string | null = null,
		public CCBStatus = false,
		public maritalStatus: string | null = null,
		public street: string | null = '',
		public number: string | null = '',
		public complement: string | null = null,
		public neighborhood: string | null = '',
		public city: string | null = '',
		public state: string | null = '',
		public postalCode: string | null = '',
		public status = true,
		public changePassword = false,
		public codeValidation = false,
		public deviceId = '',
		public deactivationDate: string | null = null,
		public createdAt = '',
		public updatedAt = ''
	) {}

	public toString(): string {
		return `${this.name}, ${this.email}, ${this.cpf}, ${this.phone}, ${this.street}, ${this.city}, ${this.state}`;
	}

	// Método ajustado para mapear corretamente os campos do JSON
	static fromJson(json: Partial<CustomerBrands>): CustomerBrands {
		// Usa valores padrão quando os campos estão ausentes ou undefined
		return new CustomerBrands(
			json.id ?? 0,
			json.userType ?? '',
			json.name ?? '',
			json.cpf ?? '',
			json.rg ?? '',
			json.currentBalance ?? '0.00',
			json.birthDate ?? null,
			json.gender ?? null,
			json.email ?? null,
			json.phone ?? null,
			json.fatherName ?? null,
			json.motherName ?? null,
			json.CCBStatus ?? false,
			json.maritalStatus ?? null,
			json.street ?? '',
			json.number ?? '',
			json.complement ?? null,
			json.neighborhood ?? '',
			json.city ?? '',
			json.state ?? '',
			json.postalCode ?? '',
			json.status ?? true,
			json.changePassword ?? false,
			json.codeValidation ?? false,
			json.deviceId ?? '',
			json.deactivationDate ?? null,
			json.createdAt ?? '',
			json.updatedAt ?? ''
		);
	}

	// Método de conversão para JSON
	public toJson(): any {
		return {
			id: this.id,
			userType: this.userType,
			name: this.name,
			cpf: Formatter.clearSymbolsAndLetters(this.cpf),
			rg: Formatter.clearSymbolsAndLetters(this.rg),
			currentBalance: this.currentBalance,
			birthDate: this.birthDate,
			gender: this.gender,
			email: this.email,
			phone: Formatter.clearSymbolsAndLetters(this.phone || ''),
			fatherName: this.fatherName,
			motherName: this.motherName,
			CCBStatus: this.CCBStatus,
			maritalStatus: this.maritalStatus,
			street: this.street,
			number: this.number,
			complement: this.complement,
			neighborhood: this.neighborhood,
			city: this.city,
			state: this.state,
			postalCode: this.postalCode,
			status: this.status,
			changePassword: this.changePassword,
			codeValidation: this.codeValidation,
			deviceId: this.deviceId,
			deactivationDate: this.deactivationDate,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt
		};
	}

	// Método de validação, considerando campos opcionais
	public isValid(): boolean {
		// Ajustado para validar somente os campos que são necessários
		return (
			this.name !== '' &&
			(this.email ? Validator.isValidEmail(this.email) : true) && // Se o email for informado, valida
			(this.cpf ? Validator.isValidCPF(this.cpf) : true) && // Se o CPF for informado, valida
			(this.phone ? Validator.isValidPhoneNumber(this.phone) : true) // Se o telefone for informado, valida
		);
	}
}

