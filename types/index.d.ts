import { FieldPath, FieldValues } from "react-hook-form";

declare type FieldBase<TFieldValues extends FieldValues> = {
  type: string;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  className?: string;
};

declare type FieldArgs<TFieldValues extends FieldValues> = {
  [K in keyof TFieldValues]: FieldBase<TFieldValues>;
};

declare type User = {
  email: string;
  userId: string;
  firstName: string;
  lastName: string;
  name: string;
  country: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
};

declare interface FooterProps {
  user: User;
  type: "mobile" | "desktop";
}

declare interface SiderbarProps {
  user: User;
}

declare interface MobileNavProps {
  user: User;
}
