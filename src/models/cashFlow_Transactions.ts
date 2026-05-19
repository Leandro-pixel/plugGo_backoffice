import { Formatter } from 'src/utils/formatter';

export class Transaction {
  constructor(
    public id: number = 0,
    public establishmentId: number = 0,
    public financingInstallmentId: number | null = null,
    public userCardId: number = 0,
    public description: string = '',
    public transactionType: string = '',
    public userName: string = '',
    public businessName: string = '',
    public status: string = '',
    public invoiceNumber: number = 0,
    public month: number = 0,
    public year: number = 0,
    public originalAmount: number = 0, // Convertido de string para número
    public installmentCount: number = 0,
    public anticipationStatus: boolean = false,
    public anticipationDate: string | null = null, // Pode ser null
    public paymentDate: string | null = null, // Pode ser null
    public originalInstallment: number = 0, // Novo campo
    public availableWithdrawalAmount: number = 0, // Novo campo
    public billingFeeAmountToPay: number = 0, // Novo campo
    public advanceFee: number = 0, // Novo campo
    public captureFee: number = 0, // Novo campo
    public createdAt: string = '', // Data formatada
    public updatedAt: string = '' // Data formatada
  ) {}

  static fromJson(json: any): Transaction | undefined {
    if (!json) return;

    return new Transaction(
      json.id,
      json.establishmentId,
      json.financingInstallmentId,
      json.userCardId,
      json.description,
      json.transactionType,
      json.userName,
      json.businessName,
      json.status,
      json.invoiceNumber,
      json.month,
      json.year,
      parseFloat(json.originalAmount),
      json.installmentCount,
      json.anticipationStatus || false,
      json.anticipationDate,
      json.paymentDate,
      parseFloat(json.originalInstallment),
      parseFloat(json.availableWithdrawalAmount),
      parseFloat(json.billingFeeAmountToPay),
      parseFloat(json.advanceFee),
      parseFloat(json.captureFee),
      Formatter.formatIsoDateToBR(json.createdAt),
      Formatter.formatIsoDateToBR(json.updatedAt)
    );

  }

  public toJson() {
    return {
      id: this.id,
      establishmentId: this.establishmentId,
      financingInstallmentId: this.financingInstallmentId,
      userCardId: this.userCardId,
      description: this.description,
      transactionType: this.transactionType,
      status: this.status,
      invoiceNumber: this.invoiceNumber,
      month: this.month,
      year: this.year,
      originalAmount: this.originalAmount.toFixed(2),
      installmentCount: this.installmentCount,
      anticipationStatus: this.anticipationStatus,
      anticipationDate: this.anticipationDate,
      paymentDate: this.paymentDate,
      userName: this.userName,
      businessName: this.businessName,
      originalInstallment: this.originalInstallment.toFixed(2), // Novo campo
      availableWithdrawalAmount: this.availableWithdrawalAmount.toFixed(2), // Novo campo
      billingFeeAmountToPay: this.billingFeeAmountToPay.toFixed(2), // Novo campo
      advanceFee: this.advanceFee.toFixed(2), // Novo campo
      captureFee: this.captureFee.toFixed(2), // Novo campo
      createdAt: Formatter.dateToTimestampBR(this.createdAt),
      updatedAt: Formatter.dateToTimestampBR(this.updatedAt),
    };
  }

  public getFormattedOriginalAmount(): string {
    return Formatter.formatNumberToBRCurrency(this.originalAmount);
  }

  public getFormattedbillingFeeAmountToPay(): string {
    return Formatter.formatNumberToBRCurrency(this.billingFeeAmountToPay);
  }

  public getFormattedOriginalInstallment(): string {
    return Formatter.formatNumberToBRCurrency(this.originalInstallment);
  }
}
