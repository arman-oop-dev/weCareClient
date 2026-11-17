"use client";

import { authClient } from "@/app/lib/auth-client";
import { Button, Input, Label, TextArea, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import {
  FaCalendarAlt,
  FaCheck,
  FaHeading,
  FaImage,
  FaMapMarkerAlt,
  FaTag,
} from "react-icons/fa";

const eventCategories = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Blood Donation",
  "Education",
  "Health Camp",
  "Other",
];

const MAX_DESCRIPTION = 1000;

const getToday = () => {
  const d = new Date();
  const offset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - offset).toISOString().split("T")[0] ?? "";
};

const labelClass =
  "mb-2 flex items-center gap-2 text-sm font-semibold text-content-primary";

const hintClass = "mt-1.5 text-xs text-content-secondary";

const CreatePost = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (isSubmitting) return;

    if (!session?.user) {
      const msg = "Please sign in before publishing an event.";
      setError(msg);
      toast.error(msg);
      return;
    }

    if (!category) {
      setCategoryError(true);
      toast.error("Please select a category.");
      return;
    }

    setCategoryError(false);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());

    setIsSubmitting(true);

    try {
      const { data: tokenData } = await authClient.token();

      if (!tokenData?.token) {
        const msg = "Authentication token not found. Please sign in again.";
        setError(msg);
        toast.error(msg);
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) throw new Error("API URL is not configured.");

      const eventData = {
        ...formValues,
        creatorID: session.user.id,
        creatorEmail: session.user.email,
        creatorName: session.user.name,
      };

      const response = await fetch(`${apiUrl}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify(eventData),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        const msg = result.message || "Something went wrong.";
        setError(msg);
        toast.error(msg);
        return;
      }

      toast.success(result.message || "Event created successfully");
      router.push("/programmes/mine");
    } catch (err) {
      console.error("Event creation error:", err);

      const msg =
        err instanceof Error
          ? err.message
          : "Unable to publish your event. Please try again.";

      setError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-background px-4 py-12 transition-colors duration-300 sm:px-6 sm:py-16 lg:px-8">
      {/* Page Heading */}
      <div className="mb-10 w-full max-w-5xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-content-primary sm:text-4xl">
          Create a <span className="text-primary">Programme</span>
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-content-secondary sm:text-base">
          Fill out the details below to publish your event. Keep it clear and
          inviting so people know exactly how they can help.
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-content-secondary/15 bg-background shadow-sm transition-colors duration-300">
        {/* Card Header */}
        <div className="border-b border-content-secondary/15 bg-foreground px-6 py-6 sm:px-12">
          <h2 className="text-xl font-semibold text-content-primary">
            Event Details
          </h2>
          <p className="mt-1 text-sm text-content-secondary">
            Provide the information needed to create your programme.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_1.5fr]">
          {/* LEFT COLUMN: Category & Image */}
          <div className="border-b border-content-secondary/15 bg-foreground/40 p-6 sm:p-10 lg:border-b-0 lg:border-r">
            {/* Category Selection */}
            <div className="mb-10">
              <Label className={labelClass}>
                <FaTag className="text-primary" />
                Select Category
              </Label>

              <div className="mt-3 grid grid-cols-2 gap-2.5">
                {eventCategories.map((item) => {
                  const active = category === item;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setCategory(item);
                        setCategoryError(false);
                      }}
                      aria-pressed={active}
                      className={`group flex items-center justify-between gap-2 rounded-xl border p-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        active
                          ? "border-primary bg-primary/10 ring-1 ring-primary/50"
                          : "border-content-secondary/20 bg-background hover:border-primary/40 hover:bg-primary/5"
                      }`}
                    >
                      <span
                        className={`text-sm font-medium ${
                          active ? "text-primary" : "text-content-primary"
                        }`}
                      >
                        {item}
                      </span>

                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                          active
                            ? "border-primary bg-primary text-white"
                            : "border-content-secondary/30 text-transparent"
                        }`}
                      >
                        <FaCheck size={10} />
                      </div>
                    </button>
                  );
                })}
              </div>

              <input type="hidden" name="eventType" value={category} />

              {categoryError && (
                <p
                  className="mt-3 text-sm font-medium text-danger"
                  role="alert"
                >
                  Please select a category.
                </p>
              )}
            </div>

            {/* Cover Image URL */}
            <TextField name="thumbnail" variant="secondary" isRequired>
              <Label className={labelClass}>
                <FaImage className="text-primary" />
                Cover Image URL
              </Label>

              <Input
                type="url"
                className="w-full"
                placeholder="https://example.com/image.jpg"
                required
              />

              <p className={hintClass}>Landscape images work best.</p>
            </TextField>
          </div>

          {/* RIGHT COLUMN: Main Form Fields */}
          <div className="space-y-8 bg-background p-6 sm:p-10">
            {/* Title & Description */}
            <div className="space-y-6">
              <TextField name="title" variant="secondary" isRequired>
                <Label className={labelClass}>
                  <FaHeading className="text-primary" />
                  Event Title
                </Label>

                <Input
                  className="w-full"
                  placeholder="e.g. Community cleanup drive"
                  maxLength={100}
                  required
                />
              </TextField>

              <TextField
                name="description"
                variant="secondary"
                isRequired
                value={description}
                onChange={setDescription}
              >
                <Label className={labelClass}>Description</Label>

                <TextArea
                  className="w-full"
                  placeholder="What will happen, who should come..."
                  rows={4}
                  maxLength={MAX_DESCRIPTION}
                  required
                />

                <p
                  className={`mt-2 text-right text-xs ${
                    description.length > MAX_DESCRIPTION * 0.9
                      ? "text-danger"
                      : "text-content-secondary"
                  }`}
                >
                  {description.length}/{MAX_DESCRIPTION}
                </p>
              </TextField>
            </div>

            {/* Logistics Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField name="eventDate" variant="secondary" isRequired>
                <Label className={labelClass}>
                  <FaCalendarAlt className="text-primary" />
                  Date
                </Label>

                <Input
                  type="date"
                  className="w-full"
                  min={getToday()}
                  required
                />
              </TextField>

              <TextField name="location" variant="secondary" isRequired>
                <Label className={labelClass}>
                  <FaMapMarkerAlt className="text-primary" />
                  Location
                </Label>

                <Input
                  className="w-full"
                  placeholder="e.g. Subid Bazar, Sylhet"
                  required
                />
              </TextField>
            </div>

            {/* Error Alert */}
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-danger/20 bg-danger/10 p-4 text-sm text-danger"
              >
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                isDisabled={isSubmitting}
                className="w-full rounded-xl bg-primary py-6 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {isSubmitting ? "Publishing Event..." : "Publish Event"}
              </Button>

              <p className="mt-4 text-center text-xs leading-6 text-content-secondary">
                By publishing, you agree to our community guidelines.
              </p>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
