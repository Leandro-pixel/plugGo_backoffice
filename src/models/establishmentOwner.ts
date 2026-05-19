import { Formatter } from 'src/utils/formatter';

export class EstablishmentOwner {
  constructor(
    public id = 0,
    public superiorId: number | null = null,
    public name = '',
    public cpf = '',
    public employeeType = '',
    public establishmentId: number | null = null,
    public currentBalance = '0.00',
    public amountToReceive = '0.00',
    public email = '',
    public phone = '',
    public status = false,
    public deviceId = '',
    public acceptedTermsOfUse = false,
    public acceptedAccreditationTerms = false,
    public latitude = '',
    public longitude = '',
    public changePassword = false,
    public deactivationDate: string | null = null,
    public createdAt = '',
    public updatedAt = ''
  ) {}

  public static fromJson(json: any): EstablishmentOwner | undefined {
    if (!json) return;
    return new EstablishmentOwner(
      json.id,
      json.superiorId,
      json.name,
      json.cpf,
      json.employeeType,
      json.establishmentId,
      json.currentBalance,
      json.amountToReceive,
      json.email,
      json.phone,
      json.status,
      json.deviceId,
      json.acceptedTermsOfUse,
      json.acceptedAccreditationTerms,
      json.latitude,
      json.longitude,
      json.changePassword,
      json.deactivationDate,
      json.createdAt,
      json.updatedAt
    );
  }

  public toString(): string {
    return `${this.name}, ${this.employeeType}, ${this.email}, ${this.phone}, ${this.status}`;
  }

  public toJson() {
    return {
      id: this.id,
      superiorId: this.superiorId,
      name: this.name,
      cpf: Formatter.clearSymbolsAndLetters(this.cpf || ''),
      employeeType: this.employeeType,
      establishmentId: this.establishmentId,
      currentBalance: this.currentBalance,
      amountToReceive: this.amountToReceive,
      email: this.email,
      phone: Formatter.clearSymbolsAndLetters(this.phone || ''),
      status: this.status,
      deviceId: this.deviceId,
      acceptedTermsOfUse: this.acceptedTermsOfUse,
      acceptedAccreditationTerms: this.acceptedAccreditationTerms,
      latitude: this.latitude,
      longitude: this.longitude,
      changePassword: this.changePassword,
      deactivationDate: this.deactivationDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
