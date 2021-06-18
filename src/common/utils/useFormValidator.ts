interface fieldErrorRule {
  required: string;
  invalid: Record<string, string>;
}

interface fieldValuesRulesProps {
  email: fieldErrorRule;
  password: fieldErrorRule;
}

export type fieldsNames = keyof fieldValuesRulesProps;

const fieldValuesRules: fieldValuesRulesProps = {
  email: {
    required: "Please provide an email address",
    invalid: { noAtFormat: "Provided email address is invalid" },
  },
  password: {
    required: "Password should consist of at least 8 characters",
    invalid: {
      atLeastOneDigit: "Password should contain at least one digit",
      atLeastOneUpper:
        "Password should contain at least one upper case character",
      atLeastOneLower:
        "Password should contain at least one lower case character",
    },
  },
};

export const useFormValidator = () => {
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
