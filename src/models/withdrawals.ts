import { Formatter } from 'src/utils/formatter';

export class Withdrawal {
  constructor(
    public id: number = 0,
    public establishmentId: number = 0,
    public employeeId: number = 0,
    public paidStatus: boolean = false,
    public pixKey: string = '',
    public amountToReceive: number = 0,
    public amountToReceiveWithFee: number = 0,
    public tradeName: string = '',
    public businessName: string = '',
    public employeeName: string = '',
    public anticipationType: string = '',
    public discountedByAnticipationFee: number = 0,
    public captureFee: number = 0,
    public splitDiscount: number = 0,
    public paymentDate: string = '',
    public createdAt: string = '',
    public updatedAt: string = ''
  ) {}

  static fromJson(json: any): Withdrawal | undefined {
    if (!json) return;

    return new Withdrawal(
      json.id,
      json.establishmentId,
      json.employeeId,
      json.paidStatus || false,
      json.pixKey,
      parseFloat(json.amountToReceive),
      parseFloat(json.amountToReceiveWithFee),
      json.tradeName,
      json.businessName,
      json.employeeName,
      json.anticipationType,
      parseFloat(json.discountedByAnticipationFee),
      parseFloat(json.captureFee),
      parseFloat(json.splitDiscount),
      Formatter.formatIsoDateToBR(json.paymentDate),
      Formatter.formatIsoDateToBR(json.createdAt),
      Formatter.formatIsoDateToBR(json.updatedAt)
    );
  }

  public toJson() {
    return {
      id: this.id,
      establishmentId: this.establishmentId,
      employeeId: this.employeeId,
      paidStatus: this.paidStatus,
      pixKey: this.pixKey,
      amountToReceive: this.amountToReceive.toFixed(2),
      amountToReceiveWithFee: this.amountToReceiveWithFee.toFixed(2),
      tradeName: this.tradeName,
      businessName: this.businessName,
      employeeName: this.employeeName,
      anticipationType: this.anticipationType,
      discountedByAnticipationFee: this.discountedByAnticipationFee.toFixed(2),
      captureFee: this.captureFee.toFixed(2),
      splitDiscount: this.splitDiscount.toFixed(2),
      paymentDate: Formatter.dateToTimestampBR(this.paymentDate),
      createdAt: Formatter.dateToTimestampBR(this.createdAt),
      updatedAt: Formatter.dateToTimestampBR(this.updatedAt)
    };
  }

  public getFormattedAmountToReceive(): string {
    return Formatter.formatDoubleToCurrency(this.amountToReceive);
  }

  public getFormattedAmountToReceiveWithFee(): string {
    return Formatter.formatDoubleToCurrency(this.amountToReceiveWithFee);
  }

  public getFormattedDiscountedByAnticipationFee(): string {
    return Formatter.formatNumberToBRCurrency(this.discountedByAnticipationFee);
  }
}
