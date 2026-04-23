export class RegisterAuthDto {
  fullName: string;
  username: string;
  password: string;
  role: string;
}

export class LoginAuthDto {
  username: string;
  password: string;
}
