import * as yup from 'yup';
import {
  VALIDATION_ERROR_ACCEPT_LIC,
  VALIDATION_ERROR_EMAIL,
  VALIDATION_ERROR_REQUIRED,
  VALIDATION_ERROR_TELEPHONE,
} from '../../config/validationMessages';

const TELEPHONE_REG_EXP = new RegExp(
  '^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$',
);

export const signUpValuesSchema = yup.object({
  name: yup.string().required(VALIDATION_ERROR_REQUIRED),
  email: yup
    .string()
    .email(VALIDATION_ERROR_EMAIL)
    .required(VALIDATION_ERROR_REQUIRED),
  telephone: yup
    .string()
    .matches(TELEPHONE_REG_EXP, VALIDATION_ERROR_TELEPHONE)
    .required(VALIDATION_ERROR_REQUIRED),
  language: yup.string().required(VALIDATION_ERROR_REQUIRED),
  accept: yup.boolean().oneOf([true], VALIDATION_ERROR_ACCEPT_LIC).required(),
});

export interface SignUpValues extends yup.Asserts<typeof signUpValuesSchema> {}
