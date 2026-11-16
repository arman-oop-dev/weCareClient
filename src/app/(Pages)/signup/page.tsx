"use client";

import EmailComponent from "@/app/components/Login/EmailComponent";
import NameFieldComponent from "@/app/components/Login/NameFieldComponent";
import PasswordComponent from "@/app/components/Login/PasswordComponent";
import { authClient } from "@/app/lib/auth-client";
import { Button, ErrorMessage } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const SignUpForm = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handlerSignUp = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    const name = (formData.get("fullname") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      setIsLoading(true);

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message || "Something went wrong.");
        return;
      }

      if (data) {
        router.push("/");
        router.refresh();
      }
    } catch {
      setErrorMessage("Unable to create your account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlerGoogleSignUp = async () => {
    try {
      setIsGoogleLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      setErrorMessage("Google sign-up failed. Please try again.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100svh-80px)] flex items-center justify-center px-4 py-10 sm:px-6">
      <section className="w-full max-w-md rounded-3xl border border-content-secondary/15 bg-base-100 p-6 shadow-sm sm:p-8 lg:p-10">
        {/* Header */}
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-content-primary sm:text-3xl">
            Create an Account
          </h1>

          <p className="text-sm leading-relaxed text-content-secondary">
            Join weCare and discover programmes and events.
          </p>
        </div>

        {/* Signup Form */}
        <form className="flex flex-col gap-5" onSubmit={handlerSignUp}>
          <div className="space-y-4">
            <NameFieldComponent />
            <EmailComponent />
            <PasswordComponent />
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="rounded-xl border border-danger/20 bg-danger/5 px-4 py-3"
            >
              <ErrorMessage className="text-sm font-medium text-danger">
                {errorMessage}
              </ErrorMessage>
            </div>
          )}

          <Button
            className="mt-1 h-12 w-full rounded-xl bg-primary text-base font-semibold text-white shadow-sm transition-all hover:bg-secondary hover:shadow-md"
            type="submit"
            isDisabled={isLoading || isGoogleLoading}
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-content-secondary/20" />
          <span className="text-xs font-medium uppercase tracking-wider text-content-secondary">
            Or continue with
          </span>
          <div className="h-px flex-1 bg-content-secondary/20" />
        </div>

        {/* Google Signup */}
        <Button
          variant="outline"
          className="h-12 w-full rounded-xl border-content-secondary/25 bg-base-100 text-sm font-medium text-content-primary transition-colors hover:bg-base-300"
          onPress={handlerGoogleSignUp}
          isDisabled={isLoading || isGoogleLoading}
        >
          <FcGoogle className="text-xl" />
          {isGoogleLoading ? "Connecting..." : "Continue with Google"}
        </Button>

        {/* Sign In */}
        <div className="mt-8 border-t border-content-secondary/15 pt-6 text-center">
          <p className="text-sm text-content-secondary">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-primary underline-offset-4 transition-colors hover:text-secondary hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignUpForm;
