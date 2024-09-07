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
