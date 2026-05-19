import { Formatter } from 'src/utils/formatter';

export class Employee {
  constructor(
    public id: number = 0,
    public superiorId: number | null = null,
    public name: string = '',
    public cpf: string = '',
    public employeeType: string = '',
    public establishmentId: number = 0,
    public currentBalance: string = '0.00',
    public amountToReceive: string = '0.00',
    public email: string = '',
    public phone: string = '',
    public status: boolean = true,
    public deviceId: string | null = null,
    public acceptedTermsOfUse: boolean = false,
    public acceptedAccreditationTerms: boolean = false,
    public latitude: number | null = null,
    public longitude: number | null = null,
    public changePassword: boolean = true,
    public deactivationDate: string | null = null,
    public createdAt: string = '',
    public updatedAt: string = ''
  ) {}

  // Método para criar um objeto Employee a partir de um JSON
  public static fromJson(json: any): Employee | undefined {
    if (!json) return;
    return new Employee(
      json.employee.id,
      json.employee.superiorId,
      json.employee.name,
      json.employee.cpf,
      json.employee.employeeType,
      json.employee.establishmentId,
      json.employee.currentBalance,
      json.employee.amountToReceive,
      json.employee.email,
      json.employee.phone,
      json.employee.status,
      json.employee.deviceId,
      json.employee.acceptedTermsOfUse,
      json.employee.acceptedAccreditationTerms,
      json.employee.latitude,
      json.employee.longitude,
      json.employee.changePassword,
      json.employee.deactivationDate,
      json.employee.createdAt,
      json.employee.updatedAt
    );
  }

  // Método para converter o objeto Employee para JSON
  public toJson() {
    return {
      id: this.id,
      superiorId: this.superiorId,
      name: this.name,
      cpf: Formatter.clearSymbolsAndLetters(this.cpf),
      employeeType: this.employeeType,
      establishmentId: this.establishmentId,
      currentBalance: this.currentBalance,
      amountToReceive: this.amountToReceive,
      email: this.email,
      phone: Formatter.clearSymbolsAndLetters(this.phone),
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
