import { Report } from '@/models/representative'
import { ReportRepository } from 'src/repositories/reportRepository'

class CreateReportUseCase {
	private reportRepository: ReportRepository
	constructor (reportRepository: ReportRepository) {
		this.reportRepository = reportRepository
	}

	async execute (rep: Report) {
		return await this.reportRepository.createReport(rep)
	}
  async executePredict () {
		return await this.reportRepository.predict()
	}
}

export default CreateReportUseCase

