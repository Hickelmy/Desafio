import { Clinica } from '../../../models/clinica.model';

export class CreateClinica {
  static readonly type = '[Clinica] Create';
  constructor(public readonly payload: Clinica) {}
}

export class UpdateClinica {
  static readonly type = '[Clinica] Update';
  constructor(public readonly payload: Clinica) {}
}

export class DeleteClinica {
  static readonly type = '[Clinica] Delete';
  constructor(public readonly id: string) {} 
}

export class SetFiltro {
  static readonly type = '[Clinica] SetFiltro';
  constructor(public readonly termo: string) {}
}

export class LoadClinicas {
  static readonly type = '[Clinicas] Load';
  constructor(public payload: { search: string; page: number; limit: number }) {}
}

export class SetFiltroClinicas {
  static readonly type = '[Clinicas] Set Filtro';
  constructor(public filtro: string) {}
}

