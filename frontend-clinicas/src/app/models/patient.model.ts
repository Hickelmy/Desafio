export interface Patient {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  dob: string;
  status: 'Active' | 'Inactive';
  doctor: string;      
  lastVisit?: string;
  avatar?: string;
}
