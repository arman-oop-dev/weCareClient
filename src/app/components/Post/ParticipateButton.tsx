"use client";

import { authClient } from "@/app/lib/auth-client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface JoinRequest {
  eventId: string;
  creatorID: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  alreadyJoined?: boolean;
}

const ParticipateButton = ({
  eventId,
  creatorID,
  title,
  description,
  eventType,
  thumbnail,
  location,
  eventDate,
  alreadyJoined = false,
}: JoinRequest) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(alreadyJoined);

  const joinHandler = async () => {
    if (joined || loading) return;

    try {
      setLoading(true);

      const { data } = await authClient.token();

      if (!data?.token) {
        toast.error("Please login before joining");
        router.push("/signin");
        return;
      }

      const eventData = {
        creatorID,
        title,
        description,
        eventType,
        thumbnail,
        location,
        eventDate,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/join/${eventId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },
          body: JSON.stringify(eventData),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setJoined(true);
        }

        toast.error(result?.message || "Failed to join the event");
        return;
      }

      setJoined(true);
      toast.success("Successfully joined the event!");
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onPress={joinHandler}
      isDisabled={loading || joined}
      className={`mt-7 w-full rounded-xl py-6 font-semibold text-white shadow-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-70 ${
        joined ? "bg-success" : "bg-primary hover:bg-secondary"
      }`}
    >
      {joined ? "✓ Joined" : loading ? "Joining..." : "Participate"}
    </Button>
  );
};

export default ParticipateButton;
