export class CreateDoctorDto {
  fullName: string;
  specialization: string;
  doctorFee: number;
  address: string;
  remarks: string;
  phoneNumber: string;
}

export class UpdateDoctorDto {
  fullName?: string;
  specialization?: string;
  doctorFee?: number;
  address?: string;
  remarks?: string;
  phoneNumber?: string;
}
