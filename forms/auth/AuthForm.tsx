"use client";

import { Fragment } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { renderField } from "@/lib/formUtils";
import {
  signInFieldOrder,
  signUpFieldOrder,
  fieldArgs,
} from "@/form-fields/auth";

import { Loader2 } from "lucide-react";
import {
  authFormSchema,
  extendedSchema,
  AuthenticationForm,
} from "@/lib/validation/auth";
import { FieldBase } from "@/types";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

type AuthFormProps = {
  type: string;
};

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const router = useRouter();
  const { signin, signup } = useAuth();
  const isTypeSignIn: boolean = type === "sign-in";
  const extendedFieldOrder = isTypeSignIn ? signInFieldOrder : signUpFieldOrder;
  const extendedAuthSchema = isTypeSignIn ? authFormSchema : extendedSchema;

  const form = useForm<AuthenticationForm>({
    resolver: zodResolver(extendedAuthSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form;

  const onSubmit: SubmitHandler<AuthenticationForm> = async (data) => {
    const { email, password } = data as keyof AuthenticationForm;
    if (type === "sign-in") {
      await signin(email, password);
    }
    if (type === "sign-up") {
      await signup(email, password).then((data) => {
        console.log({ data });
      });
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link className="cursor-pointer items-center gap-1" href="#">
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Legendary CV Service
          </h1>
          <p className="my-3">
            Create a Legendary CV in a matter of seconds tailored to the job
            description
          </p>
        </Link>
      </header>
      <>
        <Form {...form}>
          <form
            className="grid col-span-2 gap-4 items-baseline"
            onSubmit={handleSubmit(onSubmit)}
          >
            {extendedFieldOrder.map((name) => (
              <Fragment key={name}>
                {renderField<AuthenticationForm, FieldBase<AuthenticationForm>>(
                  {
                    control: control,
                    field: fieldArgs[name as keyof AuthenticationForm],
                  }
                )}
              </Fragment>
            ))}
            <div className="grid col-span-2 gap-4 !mt-4">
              <Button type="submit" variant={"primary"} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    Submitting...
                    <Loader2 size={20} className="animate-spin ml-2" />
                  </>
                ) : isTypeSignIn ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
          </form>
        </Form>
        <footer className="flex justify-center gap-1">
          <p className="text-14 font-normal text-gray-600">
            {isTypeSignIn
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <Link
            className="form-link"
            href={isTypeSignIn ? "/sign-up" : "/sign-in"}
          >
            {isTypeSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </footer>
      </>
    </section>
  );
};

export default AuthForm;
