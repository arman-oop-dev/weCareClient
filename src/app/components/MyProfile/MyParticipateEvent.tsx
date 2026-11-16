"use client";

import { Alert, Button } from "@heroui/react";

import { getEventbyUserParticipations } from "@/app/api/getProductofUserAPI";
import { JoinEventData } from "@/app/lib/Interface/Menu";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import LeaveEvent from "./LeaveEvent";

const FALLBACK_THUMBNAIL = "/placeholder-event.jpg";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const MyParticipateEvent = () => {
  const [events, setEvents] = useState<JoinEventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEventbyUserParticipations()
      .then(setEvents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleLeft = (participationId: string) => {
    setEvents((prev) => prev.filter((e) => e._id !== participationId));
  };

  if (loading)
    return (
      <p className="py-10 text-center text-sm text-content-secondary">
        Loading...
      </p>
    );

  if (error)
    return <p className="py-10 text-center text-sm text-danger">{error}</p>;

  if (events.length === 0)
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center px-4">
        <Alert
          status="default"
          className="w-full max-w-md rounded-2xl border border-content-secondary/15 bg-foreground p-6 text-content-primary"
        >
          <div className="flex w-full flex-col items-center gap-4 text-center">
            <IoInformationCircleOutline className="text-3xl text-primary" />

            <Alert.Content className="flex flex-col items-center gap-1">
              <Alert.Title className="text-lg font-semibold text-content-primary">
                You haven&apos;t joined any events yet.
              </Alert.Title>

              <Alert.Description className="text-sm text-content-secondary">
                Events you join will appear here.
              </Alert.Description>
            </Alert.Content>

            <Link href="/programmes">
              <Button
                size="md"
                variant="primary"
                className="mt-2 w-full bg-secondary font-medium text-white hover:bg-primary sm:w-auto sm:px-8"
              >
                Browse Events
              </Button>
            </Link>
          </div>
        </Alert>
      </div>
    );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((item) => (
        <div
          key={item._id}
          className="group flex flex-col overflow-hidden rounded-2xl border border-content-secondary/15 bg-foreground p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          {/* Image */}
          <Link
            href={`/programmes/${item.eventId}`}
            className="relative block aspect-[16/10] w-full overflow-hidden rounded-2xl"
          >
            <Image
              src={item.thumbnail || FALLBACK_THUMBNAIL}
              alt={item.title}
              width={640}
              height={400}
              className="h-full w-full rounded-2xl object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />

            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              <MdCategory className="text-sm text-primary" aria-hidden />
              {item.eventType}
            </span>
          </Link>

          {/* Info */}
          <div className="flex flex-1 flex-col px-2 pt-5 sm:px-5">
            <div className="flex flex-wrap items-center gap-3 text-sm text-content-secondary">
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

            <Link href={`/programmes/${item.eventId}`}>
              <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug text-content-primary transition-colors hover:text-primary">
                {item.title}
              </h3>
            </Link>
          </div>

          {/* Actions */}
          <div className="mt-5 flex items-center gap-2 border-t border-content-secondary/15 px-2 pt-4 sm:px-5">
            <Link
              href={`/programmes/${item.eventId}`}
              className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-white transition-colors duration-200 hover:bg-secondary"
            >
              <FiEye className="text-base" aria-hidden />
              View Details
            </Link>

            <LeaveEvent
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

export default MyParticipateEvent;
