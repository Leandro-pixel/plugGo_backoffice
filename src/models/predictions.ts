// src/models/Predict.ts

export class Predict {
  constructor(
    public message: string = '',
    public riskLevel: string = '',
    public additionalInfo: string = ''
  ) {}

  static fromJson(json: any): Predict | undefined {
    if (!json) return;
    return new Predict(
      json.message || '',
      json.riskLevel || '',
      json.additionalInfo || ''
    );
  }

  public toJson() {
    return {
      message: this.message,
      riskLevel: this.riskLevel,
      additionalInfo: this.additionalInfo
    };
  }
}
