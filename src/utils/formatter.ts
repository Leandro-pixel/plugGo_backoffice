import { cnpj, cpf } from 'cpf-cnpj-validator'

export class Formatter {
	static clearSymbols = (value: string): string => {
		return value.replace(/[^0-9a-zA-Z]/g, '')
	}

	static clearString = (value: string): string => {
		return value.replace(/\D/g, '')
	}

	static clearNumbers = (value: string): string => {
		return value.replace(/[0-9]/g, '')
	}

	static clearSymbolsAndLetters = (value: string): string => {
		return value.replace(/[^0-9]/g, '')
	}

	static clearSpacesAndSymbols = (value: string): string => {
		return value.replace(/[^0-9a-zA-Z]/g, '')
	}

  static formatDoubleToCurrency = (value: number): string => {
    return `R$${value.toFixed(2).replace('.', ',')}`
  }

	static formatNumberToBRCurrency = (value: number): string => {
    console.log('chegou aqui' + Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value / 100))
		return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value / 100)
	}

	static timestampToDateBR = (timestamp: number): string => {
		const date = new Date(timestamp * 1000)

		if (date.getUTCHours() === 0) {
			date.setUTCHours(3)
		}

		return date.toLocaleString('pt-BR')
	}

	static dateToTimestamp = (dateString:string): number => {
		const parts = dateString.split('/')
		const day = parseInt(parts[0], 10)
		const month = parseInt(parts[1], 10) - 1
		const year = parseInt(parts[2], 10)
		return new Date(year, month, day).getTime() / 1000
	}

  static dateToTimestampBR = (dateString: string): number => {
    const parts = dateString.split(/[- :]/); // Divide ano, mês, dia, hora, minutos e segundos
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Meses em JavaScript começam em 0
    const day = parseInt(parts[2], 10);
    const hours = parseInt(parts[3], 10);
    const minutes = parseInt(parts[4], 10);
    const seconds = parseInt(parts[5], 10);

    return new Date(year, month, day, hours, minutes, seconds).getTime() / 1000; // Converte para timestamp
  };

  static formatIsoDateToBR = (isoDate: string): string => {
    const date = new Date(isoDate.replace(' ', 'T')); // Converte para formato ISO
  const formattedDate = date.toLocaleDateString('pt-BR'); // Formato da data no padrão brasileiro
  const formattedTime = date.toLocaleTimeString('pt-BR'); // Formato da hora no padrão brasileiro
  return `${formattedDate} às ${formattedTime}`; // Junta a data e hora
};

static formatDateToBR = (dateString: string): string => {
  // Separa a data e hora
  const [datePart, timePart] = dateString.split(' '); // Divide em data e hora

  // Divide a data em ano, mês e dia
  const [year, month, day] = datePart.split('-');

  // Formata o ano para 2 dígitos
  const shortYear = year.slice(2); // Pega apenas os 2 últimos dígitos do ano

  // Divide a hora e minuto
  const [hours, minutes] = timePart.split(':');

  // Retorna a data e hora no formato DD/MM/YY HH:mm
  return `${day}/${month}/${shortYear} às ${hours}:${minutes}`;
};



	static phoneToBR = (value: string): string => {
		Formatter.clearSymbols(value)
		if (value.length === 13) {
			value = value.slice(0, 12)
		}
		return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
	}

	static strToCpf = (string: string): string => {
		return cpf.format(string)
	}

	static strToCnpj = (string: string): string => {
		return cnpj.format(string)
	}

	static strToCep = (string: string): string => {
		return string.replace(/(\d{5})(\d{3})/, '$1-$2')
	}

	static intToCurrencyK = (value: number): string => {
		value = value / 100
		let formattedValue = ''
		if (value >= 1000) {
			formattedValue = (value / 1000).toFixed(0) + 'k'
		} else {
			formattedValue = value.toFixed(0)
		}
		return formattedValue
	}

  static strToCurrency(creditBalance: string): string {
    const numberValue = parseFloat(creditBalance); // Converte para número
    const currencyFormatter = new Intl.NumberFormat('pt-BR', {  // Usando a localidade brasileira
      style: 'currency',
      currency: 'BRL',
    });
    return currencyFormatter.format(numberValue); // Formata o número como moeda
  }

	static brlToCents = (value:string): number => {
		value = value.replace(/\D/g, '')
		return parseInt(value) * 100
	}

	static intToMonth = (value: number): string => {
		const months = [
			'Janeiro',
			'Fevereiro',
			'Março',
			'Abril',
			'Maio',
			'Junho',
			'Julho',
			'Agosto',
			'Setembro',
			'Outubro',
			'Novembro',
			'Dezembro'
		]
		return months[value - 1]
	}

	static capitalize = (value: string): string => {
		return value.charAt(0).toUpperCase() + value.slice(1)
	}
}
