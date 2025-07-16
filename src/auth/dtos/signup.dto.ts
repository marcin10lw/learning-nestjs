import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

const PASSWORD_VALIDATION = {
  SPECIAL_CHAR_REGEX: /^(?=.*\W)/,
  NUMBER_REGEX: /^(?=.*\d)/,
  LOWERCASE_REGEX: /^(?=.*[a-z])/,
  UPPERCASE_REGEX: /^(?=.*[A-Z])/,
  MIN_LENGTH: 8,
  COMBINED_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/,
};

export class SignupDto {
  @IsEmail()
  email: string;

  @MinLength(PASSWORD_VALIDATION.MIN_LENGTH, {
    message: `Password must be at least ${PASSWORD_VALIDATION.MIN_LENGTH} characters long.`,
  })
  @Matches(PASSWORD_VALIDATION.LOWERCASE_REGEX, {
    message: 'Password must contain at least one lowercase letter.',
  })
  @Matches(PASSWORD_VALIDATION.UPPERCASE_REGEX, {
    message: 'Password must contain at least one uppercase letter.',
  })
  @Matches(PASSWORD_VALIDATION.NUMBER_REGEX, {
    message: 'Password must contain at least one number.',
  })
  @Matches(PASSWORD_VALIDATION.SPECIAL_CHAR_REGEX, {
    message: 'Password must contain at least one special character.',
  })
  @IsNotEmpty()
  password: string;
}
