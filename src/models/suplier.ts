import { Formatter } from 'src/utils/formatter';

export class Supplier {
  constructor(
    public id: number = 0,
    public businessName: string = '',
    public email: string = '',
    public phone: string = '',
    public cpf: string | null = null,
    public cnpj: string | null = null,
    public establishmentId: number | null = null,
    public superiorId: number | null = null,
    public employeeType: string = '',
    public acceptedAccreditationTerms: boolean = false,
    public acceptedTermsOfUse: boolean = false,
    public changePassword: boolean = false,
    public status: boolean = false,
    public amountToReceive: number = 0,
    public currentBalance: number = 0,
    public latitude: number | null = null,
    public longitude: number | null = null,
    public createdAt: string = '',
    public updatedAt: string = '',
    public deactivationDate: string | null = null,
    public deviceId: string | null = null
  ) {}

  static fromJson(json: any): Supplier | undefined {
    if (!json) return;
    return new Supplier(
      json.id,
      json.businessName,
      json.email,
      Formatter.clearSymbolsAndLetters(json.phone || ''),
      json.cnpj,
      json.cpf,
      json.establishmentId,
      json.superiorId,
      json.employeeType,
      Boolean(json.acceptedAccreditationTerms),
      Boolean(json.acceptedTermsOfUse),
      Boolean(json.changePassword),
      Boolean(json.status),
      parseFloat(json.amountToReceive) || 0,
      parseFloat(json.currentBalance) || 0,
      json.latitude ? parseFloat(json.latitude) : null,
      json.longitude ? parseFloat(json.longitude) : null,
      json.createdAt,
      json.updatedAt,
      json.deactivationDate,
      json.deviceId
    );
  }

  public toJson() {
    return {
      id: this.id,
      name: this.businessName,
      email: this.email,
      phone: Formatter.clearSymbolsAndLetters(this.phone),
      cpf: this.cpf,
      cnpj: this.cnpj,
      establishmentId: this.establishmentId,
      superiorId: this.superiorId,
      employeeType: this.employeeType,
      acceptedAccreditationTerms: this.acceptedAccreditationTerms,
      acceptedTermsOfUse: this.acceptedTermsOfUse,
      changePassword: this.changePassword,
      status: this.status,
      amountToReceive: this.amountToReceive.toFixed(2),
      currentBalance: this.currentBalance.toFixed(2),
      latitude: this.latitude,
      longitude: this.longitude,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deactivationDate: this.deactivationDate,
      deviceId: this.deviceId
    };
  }
}
