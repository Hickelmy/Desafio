import { Doctor } from "../../../models/doctor.model";

export class LoadDoctors {
  static readonly type = '[Doctor] Load All';
}


export class SetDoctorFilter {
  static readonly type = '[Doctor] Set Filter';
  constructor(public readonly filter: string) {}
}

export class SetDoctorPage {
  static readonly type = '[Doctor] Set Page';
  constructor(
    public readonly page: number,
    public readonly limit?: number
  ) {}
}

export class AddDoctor {
  static readonly type = '[Doctor] Add';
  constructor(public readonly doctor: Doctor) {}
}


export class UpdateDoctor {
  static readonly type = '[Doctor] Update';
  constructor(
    public readonly id: string,
    public readonly changes: Partial<Doctor>
  ) {}
}


export class DeleteDoctor {
  static readonly type = '[Doctor] Delete';
  constructor(public readonly id: string) {}
}
