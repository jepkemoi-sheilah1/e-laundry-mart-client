export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}
