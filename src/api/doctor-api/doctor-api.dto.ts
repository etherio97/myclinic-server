export class CreateDoctorDto {
  fullName: string;
  specialization: string;
  licenseNo: string;
  phoneNumber: string;
}

export class UpdateDoctorDto {
  fullName?: string;
  specialization?: string;
  licenseNo?: string;
  phoneNumber?: string;
}
