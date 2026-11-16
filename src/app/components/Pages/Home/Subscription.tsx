"use client";

import { Button, Input } from "@heroui/react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";

const Subscription = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/subscription`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmedEmail }),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Subscription failed.");
      }

      toast.success(result.message || "Thank you for subscribing!");
      setEmail("");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full rounded-2xl border border-content-secondary/15 bg-foreground px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-content-primary sm:text-3xl">
          Stay Connected With Us
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-content-secondary sm:text-base">
          Subscribe to our newsletter and get the latest updates directly in
          your inbox.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <Input
            type="email"
            name="email"
            placeholder="Enter your email address"
            aria-label="Email address"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
            disabled={loading}
            className="w-full flex-1"
          />

          <Button
            type="submit"
            isDisabled={loading}
            className="h-12 w-full shrink-0 rounded-lg bg-primary px-7 font-semibold text-white transition-colors hover:bg-secondary sm:w-auto"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Subscription;
