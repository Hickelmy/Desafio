import { Patient } from "../../../models/patient.model";

export class LoadPatients {
  static readonly type = '[Patients] Load';
  constructor(
    public page: number,
    public limit: number,
    public search: string = ''
  ) {}
}

export class SetPatientSearch {
  static readonly type = '[Patients] Set Search';
  constructor(public search: string) {}
}

export class SetPatientFilter {
  static readonly type = '[Patients] Set Filter';
  constructor(public filter: 'All' | 'Active' | 'Inactive') {}
}

export class SetPatientPage {
  static readonly type = '[Patients] Set Page';
  constructor(public page: number, public limit: number) {}
}

export class CreatePatient {
  static readonly type = '[Patients] Create';
  constructor(public patient: Partial<Patient>) {}
}

export class UpdatePatient {
  static readonly type = '[Patients] Update';
  constructor(public id: string, public changes: Partial<Patient>) {}
}

export class DeletePatient {
  static readonly type = '[Patients] Delete';
  constructor(public id: string) {}
}
