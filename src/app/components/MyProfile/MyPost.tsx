"use client";

import { getEventbyUser } from "@/app/api/getProductofUserAPI";
import { Alert, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import { IoAlertCircleOutline } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import DeleteEvent from "./deleteEvent";
import UpdateEvent from "./UpdateEvent";
import { JoinEventData } from "./MyParticipateEvent";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const MyPost = () => {
  const [events, setEvents] = useState<JoinEventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEventbyUser()
      .then(setEvents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Remove deleted event from state
  const handleLeft = (id: string) => {
    setEvents((prev) => prev.filter((e) => e._id !== id));
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="animate-pulse text-sm font-medium text-content-secondary">
          Loading your events...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="rounded-xl border border-danger/20 bg-danger/10 px-5 py-3 text-sm text-danger">
          {error}
        </p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center px-4">
        <Alert
          status="danger"
          className="w-full max-w-md rounded-2xl border border-content-secondary/15 bg-foreground p-6 shadow-sm"
        >
          <div className="flex w-full flex-col items-center gap-4 text-center">
            <IoAlertCircleOutline className="text-3xl text-primary" />

            <Alert.Content className="flex flex-col items-center gap-1">
              <Alert.Title className="text-lg font-semibold text-content-primary">
                No events yet.
              </Alert.Title>

              <Alert.Description className="text-sm text-content-secondary">
                Events you create will appear here.
              </Alert.Description>
            </Alert.Content>

            <Link href="/programmes/post">
              <Button
                size="md"
                variant="primary"
                className="mt-2 w-full bg-secondary font-medium text-white hover:bg-primary sm:w-auto sm:px-8"
              >
                Create Event
              </Button>
            </Link>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((item) => (
        <div
          key={item._id}
          className="group flex flex-col overflow-hidden rounded-2xl border border-content-secondary/15 bg-foreground p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
        >
          {/* Image */}
          <Link
            href={`/programmes/${item._id}`}
            className="relative block aspect-[16/10] w-full overflow-hidden rounded-xl bg-background"
          >
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={640}
              height={400}
              className="h-full w-full rounded-xl object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />

            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              <MdCategory className="text-sm text-primary" aria-hidden />
              {item.eventType}
            </span>
          </Link>

          {/* Info */}
          <div className="flex flex-1 flex-col px-2 pt-5 sm:px-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-content-secondary sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <FaMapLocation className="shrink-0 text-primary" aria-hidden />
                <span className="max-w-[140px] truncate">{item.location}</span>
              </span>

              <span className="h-3 w-px bg-content-secondary/30" aria-hidden />

              <span className="inline-flex items-center gap-1.5">
                <FaRegCalendarAlt
                  className="shrink-0 text-primary"
                  aria-hidden
                />
                {formatDate(item.eventDate)}
              </span>
            </div>

            <Link href={`/programmes/${item._id}`}>
              <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug text-content-primary transition-colors hover:text-primary">
                {item.title}
              </h3>
            </Link>
          </div>

          {/* Actions */}
          <div className="mt-5 flex items-center gap-2 border-t border-content-secondary/15 px-2 pt-4 sm:px-3">
            {/* View Details */}
            <Link
              href={`/programmes/${item._id}`}
              className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-white transition-colors duration-200 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <FiEye className="text-base" aria-hidden />
              View Details
            </Link>

            {/* Update */}
            <UpdateEvent itemID={item._id} />

            {/* Delete */}
            <DeleteEvent
              itemTitle={item.title}
              itemID={item._id}
              onLeft={() => handleLeft(item._id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyPost;
