import React from "react";
import AuthForm from "@/forms/auth/AuthForm";

const SignUp: React.FC = () => {
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-up" />
    </section>
  );
};

export default SignUp;
