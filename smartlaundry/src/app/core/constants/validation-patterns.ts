export const VALIDATION_PATTERNS = {
  NAME: /^[a-zA-Z\s]+$/, // Only letters and spaces
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^\+?[0-9]{10,15}$/, // Phone number with optional + and 10-15 digits
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, // At least 6 chars, one uppercase, one lowercase, one number, one special char
};

export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  NAME: 'Only letters and spaces are allowed',
  EMAIL: 'Invalid email format',
  PHONE: 'Invalid phone number format',
  PASSWORD: 'Password must be at least 6 characters with uppercase, lowercase, number, and special character',
};
