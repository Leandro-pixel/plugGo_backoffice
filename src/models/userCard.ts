import { Formatter } from 'src/utils/formatter';

export class UserCard {
  constructor(
    public id: number = 0,
    public userId: number = 0,
    public cardId: number = 0,
    public invoiceClosingDate: number = 0,
    public invoiceDueDate: number = 0,
    public creditBalance: number = 0,
    public pendingBalance: number = 0,
    public debitBalance: number = 0,
    public creditLimit: number = 0,
    public debitLimit: number = 0,
    public status: boolean = false,
    public numberCard: string = '',
    public deactivationDate: string | null = null,
    public createdAt: string = '',
    public updatedAt: string = ''
  ) {}

  static fromJson(json: any): UserCard | undefined {
    if (!json) return;

    return new UserCard(
      json.id,
      json.userId,
      json.cardId,
      json.invoiceClosingDate,
      json.invoiceDueDate,
      parseFloat(json.creditBalance),
      parseFloat(json.pendingBalance),
      parseFloat(json.debitBalance),
      parseFloat(json.creditLimit),
      parseFloat(json.debitLimit),
      json.status,
      json.numberCard,
      json.deactivationDate,
      Formatter.formatIsoDateToBR(json.createdAt),
      Formatter.formatIsoDateToBR(json.updatedAt)
    );
  }

  public toJson() {
    return {
      id: this.id,
      userId: this.userId,
      cardId: this.cardId,
      invoiceClosingDate: this.invoiceClosingDate,
      invoiceDueDate: this.invoiceDueDate,
      creditBalance: this.creditBalance.toFixed(2),
      pendingBalance: this.pendingBalance.toFixed(2),
      debitBalance: this.debitBalance.toFixed(2),
      creditLimit: this.creditLimit.toFixed(2),
      debitLimit: this.debitLimit.toFixed(2),
      status: this.status,
      numberCard: this.numberCard,
      deactivationDate: this.deactivationDate,
      createdAt: Formatter.dateToTimestampBR(this.createdAt),
      updatedAt: Formatter.dateToTimestampBR(this.updatedAt)
    };
  }

  public getFormattedCreditBalance(): string {
    return Formatter.formatDoubleToCurrency(this.creditBalance);
  }

  public getFormattedPendingBalance(): string {
    return Formatter.formatNumberToBRCurrency(this.pendingBalance);
  }

  public getFormattedDebitBalance(): string {
    return Formatter.formatNumberToBRCurrency(this.debitBalance);
  }
}
