import { Formatter } from 'src/utils/formatter';


export class Notifications {
  constructor(
    public id: number = 0,
    public type: string = '',
    public action: string = '',
    public url: string = '',
    public partner: string = '',
    public status: boolean = false,
    public createdAt: string = '',
    public code: string = '',
    public description: string = '',
    public userId: number = 0,
    public establishmentId: number = 0,
    public transactionId: number = 0
  ) {}

  static fromJson(json: any): Notifications | undefined {
    if (!json) return;
    const createdAtFormatted = json.createdAt?.date
    ? Formatter.formatIsoDateToBR(json.createdAt.date)
    : '';
    return new Notifications(
      json.id,
      json.type,
      json.action,
      json.url,
      json.partner,
      json.status,
      createdAtFormatted,
      json.code,
      json.description,
      json.userId,
      json.establishmentId,
      json.transactionId
    );
  }

  public toJson() {
    return {
      id: this.id,
      type: this.type,
      action: this.action,
      url: this.url,
      partner: this.partner,
      status: this.status,
      createdAt: this.createdAt,
      code: this.code,
      description: this.description,
      userId: this.userId,
      establishmentId: this.establishmentId,
      transactionId: this.transactionId
    };
  }
}
