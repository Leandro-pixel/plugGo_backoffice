import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ReportRepository } from 'src/repositories/reportRepository'
import CreateReportUseCase from 'src/usecases/createStoreUseCase'
import { Report } from 'src/models/representative'
import { Predict } from 'src/models/predictions'

const repository = new ReportRepository()
const reportUseCase = new CreateReportUseCase(repository)

export const useReportStore = defineStore('report', {
	state: () => ({
		reports: ref([] as Predict[]),
    predict: ref<Predict | null>(null),
		totalItemsInDB: 0
	}),
  getters: {
		getPredict: (state) => state.reports,
		getPredicts: (state) => state.totalItemsInDB,
	},
	actions: {
    async fetchPredict() {
      const prediction = await reportUseCase.executePredict();

      // Agora estamos lidando com um único objeto de previsão
      if (prediction) {
        this.predict = prediction;
      } else {
        this.predict = null;
      }
    },

    async createReport (rep: Report) {
			return await reportUseCase.execute(rep)
		},
	}
})
