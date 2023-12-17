import { useContext } from "react";

import { FormContext } from "./FormContext";

export const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("useFormContext must be used within an FormContext");
  }

  return context;
};
