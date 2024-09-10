import { z } from "zod";

const stringSchema = z.string();

export const authFormSchema = z.object({
  email: stringSchema.email({ message: "Must be a valid email" }),
  password: stringSchema.min(5, { message: "Minimum of 5 characters" }),
});

const userDetailsSchema = z.object({
  firstName: stringSchema.min(2),
  lastName: stringSchema.min(2),
  address1: stringSchema.min(3, {
    message: "Minimum of 3 characters",
  }),
  state: stringSchema.min(2).max(2),
  postalCode: stringSchema.min(3).max(6),
  dateOfBirth: stringSchema.min(3),
  city: stringSchema.min(2),
  confirmPassword: stringSchema.min(5, {
    message: "Minimum of 5 characters",
  }),
});

export const extendedSchema = z
  .object({
    ...authFormSchema.shape, // Use the shape of authFormSchema
    ...userDetailsSchema.shape, // Use the shape of userDetailsSchema
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "passwordMismatchErrorMessage",
        path: ["confirmPassword"], // Specify the path where the error occurs
      });
    }
  });
export type AuthenticationForm = z.infer<
  typeof authFormSchema | typeof userDetailsSchema
>;
