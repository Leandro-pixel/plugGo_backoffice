export interface PaymentProcessor {
  label: string
  value: string
}

export default class Config {
	constructor (
    public primary = '',
    public secondary = '',
    public logoUrl = 'icons/logo_brands.png',
    public tenantName = 'PlugGo',
    public secondaryLogoUrl = 'icons/icone_brands.png',
    public SmsMessage = '',
    public paymentProcessors = [] as PaymentProcessor[],
    public recaptchaKey = ''
	) {}
}
