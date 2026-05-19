import { Predict } from 'src/models/predictions'
import api from 'src/lib/api'
import { Report } from 'src/models/representative'

export class ReportRepository {


  async createReport (rep: Report): Promise<Report> {
		try {
      console.log(rep)
			const response = await api.requestPostWithApiKey('/reports/burn', rep.toJson())
			return Report.fromJson(response) as Report
		} catch (error) {
			throw new Error('Erro ao salvar relatório')
		}
	}
  async predict (): Promise<Predict> {
    const userId = localStorage.getItem('accessToken');

    const params = Object.fromEntries(Object.entries({
        userId
    }).filter(([, value]) => value !== undefined))

    try {
        const data = await api.requestGet('/reports/predict', params);
        console.log('Data recebida:', data);

        // Verifica se o dado é único e não um array
        if (data && data.message && data.riskLevel) {
            const prediction: Predict = Predict.fromJson(data);
            console.log('Previsão recebida:', prediction);
            return prediction;
        } else {
            throw new Error('Formato de resposta inesperado');
        }
    } catch (error) {
        throw new Error('Erro ao buscar dados para previsão');
    }
}


}
