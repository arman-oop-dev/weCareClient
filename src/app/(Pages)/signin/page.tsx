"use client";

import EmailComponent from "@/app/components/Login/EmailComponent";
import PasswordComponent from "@/app/components/Login/PasswordComponent";
import { authClient } from "@/app/lib/auth-client";
import { Button, ErrorMessage } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const SignInForm = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handlerSignIn = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string)?.trim();
    const password = formData.get("password") as string;

    if (!email || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    try {
      setIsLoading(true);

      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message || "Invalid email or password.");
        return;
      }

      if (data) {
        router.push("/");
        router.refresh();
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlerGoogleSignIn = async () => {
    try {
      setErrorMessage("");
      setIsGoogleLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      setErrorMessage("Google sign-in failed. Please try again.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100svh-80px)] flex items-center justify-center px-4 py-10 sm:px-6">
      <section className="w-full max-w-md rounded-3xl border border-content-secondary/15 bg-base-100 p-6 shadow-sm sm:p-8 lg:p-10">
        {/* Header */}
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-content-primary sm:text-3xl">
            Welcome Back
          </h1>

          <p className="text-sm leading-relaxed text-content-secondary">
            Sign in to weCare and continue exploring programmes and events.
          </p>
        </div>

        {/* Signin Form */}
        <form className="flex flex-col gap-5" onSubmit={handlerSignIn}>
          <div className="space-y-4">
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
            {isLoading ? "Signing in..." : "Sign In"}
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

        {/* Google Signin */}
        <Button
          variant="outline"
          className="h-12 w-full rounded-xl border-content-secondary/25 bg-base-100 text-sm font-medium text-content-primary transition-colors hover:bg-base-300"
          onPress={handlerGoogleSignIn}
          isDisabled={isLoading || isGoogleLoading}
        >
          <FcGoogle className="text-xl" />
          {isGoogleLoading ? "Connecting..." : "Continue with Google"}
        </Button>

        {/* Sign Up */}
        <div className="mt-8 border-t border-content-secondary/15 pt-6 text-center">
          <p className="text-sm text-content-secondary">
            New to weCare?{" "}
            <Link
              href="/signup"
              className="font-semibold text-primary underline-offset-4 transition-colors hover:text-secondary hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignInForm;
