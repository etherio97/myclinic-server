export class CreatePatientDto {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  address: string;
  ssbNumber: string;
  nrcNumber: string;
  notes: string;
}

export class UpdatePatientDto {
  fullName?: string;
  dateOfBirth?: string;
  gender?: string;
  phoneNumber?: string;
  address?: string;
  ssbNumber?: string;
  nrcNumber?: string;
  notes?: string;
}
