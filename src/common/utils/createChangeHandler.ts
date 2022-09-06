import { Dispatch, SetStateAction } from "react";

// ----------------------------------------------------------------------

const createChangeHandler = (setter: Dispatch<SetStateAction<any>>) => {
  return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setter(event.target.value as string);
  };
}

export default createChangeHandler