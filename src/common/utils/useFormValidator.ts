import { useTranslation, TFunction } from 'react-i18next'

interface fieldErrorRule {
  required: string;
  invalid: Record<string, string>;
}

interface fieldValuesRulesProps {
  email: fieldErrorRule;
  password: fieldErrorRule;
}

export type cfieldsNames = keyof fieldValuesRulesProps;

const getFieldValuesRules = (t: TFunction<'common'>): fieldValuesRulesProps => {
  return {
    email: {
      required: t('forms.fields.email.rule_msg.email_required'),
      invalid: { noAtFormat: t('forms.fields.email.rule_msg.email_invalid.not_at_format') },
    },
    password: {
      required: t('forms.fields.password.rule_msg.password_required'),
      invalid: {
        atLeastOneDigit: t('forms.fields.password.rule_msg.password_invalid.at_least_one_digit'),
        atLeastOneUpper:
          t('forms.fields.password.rule_msg.password_invalid.at_least_one_upper_case'),
        atLeastOneLower:
          t('forms.fields.password.rule_msg.password_invalid.at_least_one_lower_case'),
      },
    },
  };
}

export const useFormValidator = () => {

  const { t } = useTranslation('common');

  const fieldValuesRules = getFieldValuesRules(t);

  const validateEmail = (
    emailAddress: string
  ): string | Record<string, string> => {
    if (!emailAddress || emailAddress.length === 0)
      return fieldValuesRules.email.required;

    const validEmailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!validEmailRegex.test(String(emailAddress).toLowerCase()))
      return fieldValuesRules.email.invalid.noAtFormat;

    return "";
  };

  const validatePassword = (passwordToValidate: string): string => {
    const atLeastOneDigit = /\d/;
    const atLeastOneUpperCase = /(?=.*[A-Z])/;
    const atLeastOneLowerCase = /(?=.*[a-z])/;

    if (passwordToValidate.length < 8)
      return fieldValuesRules.password.required;

    if (!atLeastOneDigit.test(passwordToValidate))
      return fieldValuesRules.password.invalid.atLeastOneDigit;

    if (!atLeastOneUpperCase.test(passwordToValidate))
      return fieldValuesRules.password.invalid.atLeastOneUpper;

    if (!atLeastOneLowerCase.test(passwordToValidate))
      return fieldValuesRules.password.invalid.atLeastOneLower;

    return "";
  };

  return { validateEmail, validatePassword };
};
