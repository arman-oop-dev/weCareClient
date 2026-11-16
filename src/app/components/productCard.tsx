import Image from "next/image";
import Link from "next/link";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { ProductData } from "../api/ProductAPI";

interface ProductCardProps {
  programs: ProductData[];
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const ProductCard = ({ programs }: ProductCardProps) => {
  if (programs.length === 0) {
    return (
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-dashed border-content-secondary/25 bg-background px-6 py-12 shadow-sm">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <MdCategory size={30} />
          </div>

          <h2 className="text-xl font-semibold text-content-primary">
            No upcoming events
          </h2>

          <p className="mt-2 text-sm leading-7 text-content-secondary">
            Check back soon — new events will appear here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto grid grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-3">
      {programs.map((item) => (
        <Link
          href={`/programmes/${item._id}`}
          key={item._id}
          className="group flex flex-col overflow-hidden rounded-2xl border border-content-secondary/15 bg-background p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_15px_40px_rgba(255,52,125,0.10)] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {/* Thumbnail */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-foreground">
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={640}
              height={400}
              className="h-full w-full rounded-xl object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />

            {/* Category Badge */}
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/65 px-3 py-1.5 text-xs font-medium text-white shadow-sm backdrop-blur-md">
              <MdCategory className="text-primary text-sm" aria-hidden />
              {item.eventType}
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col px-2 pt-5 pb-4">
            {/* Event Information */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-content-secondary">
              <span className="inline-flex min-w-0 items-center gap-1.5">
                <FaMapLocation className="shrink-0 text-primary" aria-hidden />
                <span className="max-w-[140px] truncate">{item.location}</span>
              </span>

              <span className="h-3 w-px bg-content-secondary/30" aria-hidden />

              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <FaRegCalendarAlt
                  className="shrink-0 text-primary"
                  aria-hidden
                />
                {formatDate(item.eventDate)}
              </span>
            </div>

            {/* Event Title */}
            <h3 className="mt-4 line-clamp-2 text-lg font-bold leading-snug text-content-primary transition-colors duration-200 group-hover:text-primary">
              {item.title}
            </h3>
          </div>

          {/* View Event Button */}
          <div className="mt-auto px-2 pb-2">
            <div className="flex h-11 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white shadow-sm transition-all duration-300 group-hover:bg-secondary">
              View Event
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default ProductCard;
