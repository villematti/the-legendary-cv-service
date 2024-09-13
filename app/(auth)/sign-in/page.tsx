import React from "react";
import AuthForm from "@/forms/auth/AuthForm";

const SignIn: React.FC = () => {
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-in" />
    </section>
  );
};

export default SignIn;
