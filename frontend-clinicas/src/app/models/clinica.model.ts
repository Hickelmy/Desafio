export interface Clinica {
  id?: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  regional: string;
  dataInauguracao: string;
  ativa: boolean;
  especialidades: string[]; 
}
