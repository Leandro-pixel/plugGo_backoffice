import { Formatter } from 'src/utils/formatter';

export class Invoice {
  constructor(
    public id: number = 0,
    public userCardId: number = 0,
    public userId: number = 0,
    public creditBalance: number = 0,
    public outstandingBalance: number = 0,
    public balanceWithFee: number = 0,
    public debitBalance: number = 0,
    public creditLimit: number = 0,
    public debitLimit: number = 0,
    public userName: string = '',
    public dueDate: string = '',
    public paymentDate: string = '',
    public createdAt: string = '',
    public updatedAt: string = ''
  ) {}

  static fromJson(json: any): Invoice | undefined {
    if (!json) return;

    return new Invoice(
      json.id,
      json.userCardId,
      json.userId,
      parseFloat(json.creditBalance?? 0),
      parseFloat(json.outstandingBalance?? 0),
      parseFloat(json.balanceWithFee?? 0),
      parseFloat(json.debitBalance?? 0),
      parseFloat(json.creditLimit?? 0),
      parseFloat(json.debitLimit?? 0),
      json.userName,
      Formatter.formatIsoDateToBR(json.dueDate),
      Formatter.formatIsoDateToBR(json.paymentDate),
      Formatter.formatIsoDateToBR(json.createdAt),
      Formatter.formatIsoDateToBR(json.updatedAt)
    );
  }

  public toJson() {
    return {
      id: this.id,
      userCardId: this.userCardId,
      userId: this.userId,
      creditBalance: this.creditBalance.toFixed(2),
      outstandingBalance: this.outstandingBalance.toFixed(2),
      balanceWithFee: this.balanceWithFee.toFixed(2),
      debitBalance: this.debitBalance.toFixed(2),
      creditLimit: this.creditLimit.toFixed(2),
      debitLimit: this.debitLimit.toFixed(2),
      userName: this.userName,
      dueDate: Formatter.dateToTimestampBR(this.dueDate),
      paymentDate: Formatter.dateToTimestampBR(this.paymentDate),
      createdAt: Formatter.dateToTimestampBR(this.createdAt),
      updatedAt: Formatter.dateToTimestampBR(this.updatedAt)
    };
  }

  public getFormattedCreditBalance(): string {
    return Formatter.formatNumberToBRCurrency(this.creditBalance);
  }

  public getFormattedOutstandingBalance(): string {
    return Formatter.formatNumberToBRCurrency(this.outstandingBalance);
  }

  public getFormattedBalanceWithFee(): string {
    console.log(this.balanceWithFee)
    return Formatter.formatDoubleToCurrency(this.balanceWithFee);
  }

  public getFormattedDebitBalance(): string {
    return Formatter.formatNumberToBRCurrency(this.debitBalance);
  }
}
