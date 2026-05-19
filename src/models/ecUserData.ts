// employeeEstablishmentStore.ts
export class EmployeeEstablishmentStore {
  private static readonly STORAGE_KEY = 'employeeEstablishmentData';

  // Definindo os tipos para o payload completo, que contém employee e establishment
  data: PayloadData;

  constructor() {
      this.data = {} as PayloadData;
  }

  // Método para salvar os dados no localStorage
  public saveToLocalStorage(): void {
      localStorage.setItem(EmployeeEstablishmentStore.STORAGE_KEY, JSON.stringify(this.data));
  }

  // Método para carregar os dados do localStorage
  public loadFromLocalStorage(): void {
      const data = localStorage.getItem(EmployeeEstablishmentStore.STORAGE_KEY);
      if (data) {
          this.data = JSON.parse(data);
      }
  }

  // Método para limpar os dados do localStorage
  public clearData(): void {
      localStorage.removeItem(EmployeeEstablishmentStore.STORAGE_KEY);
  }
}

// Tipos para o Payload completo

interface PayloadData {
  employee: Employee;
  establishment: Establishment;
}

interface Employee {
  id: number;
  name: string;
  cpf: string;
  employeeType: string;
  establishmentId: number;
  currentBalance: number;
  amountToReceive: number;
  email: string;
  phone: string;
  status: boolean;
  changePassword: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Establishment {
  id: number;
  cnpj: string | null;
  cpf: string;
  businessName: string;
  tradeName: string;
  issuanceDate: string | null;
  email: string;
  phone: string;
  street: string | null;
  number: string | null;
  complement: string | null;
  neighborhood: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  totalBalance: number;
  amountToReceive: number;
  availableBalance: number;
  averageTicket: string | null;
  minimumPercentage: number | null;
  maximumPercentage: number | null;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}
