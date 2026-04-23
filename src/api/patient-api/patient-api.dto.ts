export class CreatePatientDto {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  phoneNumber: string;
  address: string;
}

export class UpdatePatientDto {
  fullName?: string;
  dateOfBirth?: string;
  gender?: string;
  bloodType?: string;
  phoneNumber?: string;
  address?: string;
}
