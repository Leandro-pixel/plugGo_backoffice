/*import { defineStore } from 'pinia'
import Config from 'src/models/config'


export const useConfigStore = defineStore('config', {
	state: () => ({
		config: new Config(),
		defaultPaymentProcessor: '',
		allTenantPaymentProcessors: [] as null | string[]
	}),
	getters: {
		getConfig: (state) => state.config
	},
	actions: {
		async fetchConfig (): Promise<void> {
			if (this.config.tenantName === '') {
				this.config = repository.fetchConfig()
			}
		},
		async fetchPaymentProcessors (): Promise<string[]> {
			const data = await repository.fetchPaymentProcessors()
			this.config.paymentProcessors = data.paymentProcessors
			this.defaultPaymentProcessor = data.defaultPaymentProcessor
			this.allTenantPaymentProcessors = data.tenantPaymentProcessors ?? []

			return this.config.paymentProcessors
		},
		async fetchDefaultPaymentProcessor (): Promise<string> {
			if (this.defaultPaymentProcessor === '') {
				await this.fetchPaymentProcessors()
			}

			return this.defaultPaymentProcessor
		},
		async fetchAllTenantPaymentProcessors (): Promise<string[]> {
			if (this.allTenantPaymentProcessors === null || this.allTenantPaymentProcessors.length === 0) {
				await this.fetchPaymentProcessors()
			}

			return this.allTenantPaymentProcessors ?? []
		}
	}
})
*/
