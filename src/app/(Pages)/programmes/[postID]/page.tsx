import { getProductAPI } from "@/app/api/ProductAPI";
import ParticipateButton from "@/app/components/Post/ParticipateButton";

import Image from "next/image";
import { notFound } from "next/navigation";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";

export interface DetailsOfPost {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorID: string;
}

const PostDetails = async ({
  params,
}: {
  params: Promise<{ postID: string }>;
}) => {
  const { postID } = await params;

  const fetchedAPI: DetailsOfPost[] = await getProductAPI();

  const details = fetchedAPI.find((item) => postID === item._id);

  if (!details) notFound();

  const eventDate = new Date(details.eventDate);

  if (Number.isNaN(eventDate.getTime())) {
    notFound();
  }

  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-background pb-20 transition-colors duration-300">
      <div className="container mx-auto mt-8 max-w-7xl px-4">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-[28px] bg-foreground">
          <div className="relative h-[350px] sm:h-[450px] lg:h-[560px]">
            <Image
              src={details.thumbnail}
              alt={details.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1280px"
              className="object-cover transition-transform duration-1000 hover:scale-[1.02]"
            />

            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/10" />

            {/* Event Title */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-12">
              <span className="mb-4 inline-flex rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                {details.eventType}
              </span>

              <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                {details.title}
              </h1>

              <p className="mt-4 flex items-center gap-2 text-sm text-white/85 sm:text-base">
                <FaRegCalendarAlt />
                {formattedDate}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_350px] lg:gap-16">
          {/* Left Content */}
          <section>
            <div className="mb-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                Discover the purpose
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-content-primary sm:text-4xl">
                About This Event
              </h2>

              <div className="mt-5 h-1 w-16 rounded-full bg-primary" />
            </div>

            <div className="max-w-3xl">
              <p className="whitespace-pre-line text-base leading-[2] text-content-secondary sm:text-lg">
                {details.description}
              </p>
            </div>
          </section>

          {/* Right Sidebar */}
          <aside className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl border border-content-secondary/15 bg-foreground text-content-primary shadow-sm transition-colors duration-300">
              {/* Sidebar Header */}
              <div className="border-b border-content-secondary/15 px-7 py-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-content-secondary">
                  Event Information
                </p>

                <h3 className="mt-2 text-xl font-bold text-content-primary">
                  Event Overview
                </h3>

                <hr className="my-5 border-content-secondary/20" />

                {/* Event Information */}
                <div className="space-y-5">
                  <p className="flex items-center gap-3 text-sm text-content-secondary">
                    <FaRegCalendarAlt className="shrink-0 text-primary" />
                    <span>{formattedDate}</span>
                  </p>

                  <p className="flex items-center gap-3 text-sm text-content-secondary">
                    <FaMapLocation className="shrink-0 text-primary" />
                    <span>{details.location}</span>
                  </p>

                  <p className="flex items-center gap-3 text-sm text-content-secondary">
                    <MdCategory className="shrink-0 text-primary" />
                    <span>{details.eventType}</span>
                  </p>
                </div>

                {/* Participate Button */}
                <ParticipateButton
                  eventId={postID}
                  creatorID={details.creatorID}
                  title={details.title}
                  description={details.description}
                  eventType={details.eventType}
                  thumbnail={details.thumbnail}
                  location={details.location}
                  eventDate={details.eventDate}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default PostDetails;
