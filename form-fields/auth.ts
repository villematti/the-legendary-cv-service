import { without } from "lodash";
import { AuthenticationForm } from "@/lib/validation/auth";
import { FieldArgs } from "@/types";
const toRemove = [
  "firstName",
  "lastName",
  "address1",
  "city",
  "state",
  "postalCode",
  "dateOfBirth",
];
const fieldOrder = [...toRemove, "email", "password"];

// cols-span-1 to make the field 50%. default is 100% width
export const fieldArgs: FieldArgs<AuthenticationForm> = {
  email: {
    name: "email",
    type: "text",
  },
  password: {
    name: "password",
    type: "password",
  },
  confirmPassword: {
    name: "confirmPassword",
    type: "password",
  },
  firstName: {
    className: "cols-span-1",
    name: "firstName",
    type: "text",
  },
  lastName: {
    className: "cols-span-1",
    name: "lastName",
    type: "text",
  },
};

export const signInFieldOrder = without(fieldOrder, ...toRemove);
export const signUpFieldOrder = [...fieldOrder, "confirmPassword"];
