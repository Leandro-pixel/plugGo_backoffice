export class SupStore {
  private static readonly STORAGE_KEY = 'SupStore';

  // Definindo os tipos para o payload de suporte
  data: SupportPayloadData;

  constructor() {
      this.data = {} as SupportPayloadData;
  }

  // Método para salvar os dados no localStorage
  public saveToLocalStorage(): void {
      localStorage.setItem(SupStore.STORAGE_KEY, JSON.stringify(this.data));
  }

  // Método para carregar os dados do localStorage
  public loadFromLocalStorage(): void {
      const data = localStorage.getItem(SupStore.STORAGE_KEY);
      if (data) {
          this.data = JSON.parse(data);
      }
  }

  // Método para limpar os dados do localStorage
  public clearData(): void {
      localStorage.removeItem(SupStore.STORAGE_KEY);
  }
}

// Tipos para o Payload de suporte

interface SupportPayloadData {
  employee: SupportEmployee;
}

interface SupportEmployee {
  id: number;
  name: string;
  cpf: string | null;
  employeeType: string;
  establishmentId: number | null;
  currentBalance: number;
  amountToReceive: number;
  email: string;
  phone: string;
  status: boolean;
  changePassword: boolean;
  createdAt: string;
  updatedAt: string;
}
