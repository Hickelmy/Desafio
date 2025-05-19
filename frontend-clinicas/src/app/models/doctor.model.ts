export interface Doctor {
  id: string;
  name: string;
  crm: string;
  specialty: string;
  phone: string;
  email: string;
  status: 'Ativo' | 'Inativo';
}
