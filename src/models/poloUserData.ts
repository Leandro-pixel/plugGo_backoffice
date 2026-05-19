export class PoloDataStore {
  private static readonly STORAGE_KEY = 'PoloDataStore';

  // Definindo os tipos para o payload de polo
  data: PoloPayloadData;

  constructor() {
      this.data = {} as PoloPayloadData;
  }

  // Método para salvar os dados no localStorage
  public saveToLocalStorage(): void {
      localStorage.setItem(PoloDataStore.STORAGE_KEY, JSON.stringify(this.data));
  }

  // Método para carregar os dados do localStorage
  public loadFromLocalStorage(): void {
      const data = localStorage.getItem(PoloDataStore.STORAGE_KEY);
      if (data) {
          this.data = JSON.parse(data);
      }
  }

  // Método para limpar os dados do localStorage
  public clearData(): void {
      localStorage.removeItem(PoloDataStore.STORAGE_KEY);
  }
}

// Tipos para o Payload de polo

interface PoloPayloadData {
  employee: PoloEmployee;
}

interface PoloEmployee {
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
