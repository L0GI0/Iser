interface fieldValuesRulesProps {
  email: {
    [key: string]: string;
  };
  password: {};
}

export type fieldsNames = keyof fieldValuesRulesProps;

const fieldValuesRules: fieldValuesRulesProps = {
  email: {
    required: "Please provide email address",
    invalid: "Provided email address is invalid",
  },
  password: {},
};

export const useFormValidator = () => {
  console.log(`Validating email`);
  const validateEmail = (emailAddress: string): string => {
    if (!emailAddress || emailAddress.length === 0)
      return fieldValuesRules.email.required;

    const validEmailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!validEmailRegex.test(String(emailAddress).toLowerCase()))
      return fieldValuesRules.email.invalid;

    return "";
  };

  return { validateEmail };
};
