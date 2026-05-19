export class ReportDTO {
  constructor(
    public userId: string = '', // UUID do usuário
    public temperaturaMediaDiaria: number = 0, // Temperatura média diária
    public umidadeRelativaAr: number = 0, // Umidade relativa do ar
    public precipitacao: number = 0, // Precipitação
    public indiceUmidadeSolo: number = 0, // Índice de umidade do solo
    public indiceVegetacao: number = 0, // Índice de vegetação
    public localizacao: string = '', // Localização
    public dataHora: string = '', // Data e hora
    public areaQueimada: number = 0 // Área queimada
  ) {}

  // Método para transformar um objeto JSON em um ReportDTO
  public static fromJson(json: any): ReportDTO | undefined {
    if (!json) return;
    return new ReportDTO(
      json.userId,
      json.temperaturaMediaDiaria,
      json.umidadeRelativaAr,
      json.precipitacao,
      json.indiceUmidadeSolo,
      json.indiceVegetacao,
      json.localizacao,
      json.dataHora,
      json.areaQueimada
    );
  }

  // Método para retornar uma string representando o objeto
  public toString(): string {
    return `${this.localizacao}, ${this.temperaturaMediaDiaria}°C, ${this.umidadeRelativaAr}% RH, ${this.precipitacao}mm precipitação, Área queimada: ${this.areaQueimada} ha`;
  }

  // Método para retornar os dados do ReportDTO em formato JSON
  public toJson() {
    return {
      userId: this.userId,
      temperaturaMediaDiaria: this.temperaturaMediaDiaria,
      umidadeRelativaAr: this.umidadeRelativaAr,
      precipitacao: this.precipitacao,
      indiceUmidadeSolo: this.indiceUmidadeSolo,
      indiceVegetacao: this.indiceVegetacao,
      localizacao: this.localizacao,
      dataHora: this.dataHora,
      areaQueimada: this.areaQueimada,
    };
  }
}

export class Report {
  constructor(
    public userId: string = '',
    public temperaturaMediaDiaria: number = 0,
    public umidadeRelativaAr: number = 0,
    public precipitacao: number = 0,
    public indiceUmidadeSolo: number = 0,
    public indiceVegetacao: number = 0,
    public localizacao: string = '',
    public dataHora: string = '',
    public areaQueimada: number = 0
  ) {}

  // Método para transformar um objeto JSON em um Report
  public static fromJson(json: any): Report | undefined {
    if (!json) return;
    return new Report(
      json.userId,
      json.temperaturaMediaDiaria,
      json.umidadeRelativaAr,
      json.precipitacao,
      json.indiceUmidadeSolo,
      json.indiceVegetacao,
      json.localizacao,
      json.dataHora,
      json.areaQueimada
    );
  }

  // Método para retornar uma string representando o objeto
  public toString(): string {
    return `${this.localizacao}, ${this.temperaturaMediaDiaria}°C, ${this.umidadeRelativaAr}% RH, ${this.precipitacao}mm precipitação, Área queimada: ${this.areaQueimada} ha`;
  }

  // Método para retornar os dados do Report em formato JSON
  public toJson() {
    return {
      userId: this.userId,
      temperaturaMediaDiaria: this.temperaturaMediaDiaria,
      umidadeRelativaAr: this.umidadeRelativaAr,
      precipitacao: this.precipitacao,
      indiceUmidadeSolo: this.indiceUmidadeSolo,
      indiceVegetacao: this.indiceVegetacao,
      localizacao: this.localizacao,
      areaQueimada: this.areaQueimada,
    };
  }
}
