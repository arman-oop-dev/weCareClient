import { getProductAPI } from "@/app/api/ProductAPI";
import ProductCard from "../../productCard";

const UpcomingEvents = async () => {
  const allPrograms = await getProductAPI();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter upcoming events and get the nearest 6
  const recentPrograms = allPrograms
    .filter((item) => new Date(item.eventDate) >= today)
    .sort(
      (a, b) =>
        new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime(),
    )
    .slice(0, 6);

  return (
    <section className="container mx-auto mt-12 px-4 sm:mt-16">
      {/* Section Header */}
      <div className="mb-8 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-primary">
          Upcoming Events
        </p>

        <h2 className="text-3xl font-bold tracking-tight text-content-primary md:text-4xl">
          Join our upcoming events in person
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-content-secondary md:text-base">
          Explore upcoming programmes, connect with people, and be part of
          something meaningful.
        </p>
      </div>

      {/* Upcoming Events */}
      {recentPrograms.length > 0 ? (
        <ProductCard programs={recentPrograms} />
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-content-secondary/25 bg-background px-5 py-12 text-center shadow-sm">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <span className="text-3xl">📅</span>
          </div>

          <h3 className="text-lg font-semibold text-content-primary">
            No Upcoming Events
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-7 text-content-secondary">
            There are no upcoming events right now. Check back later for new
            programmes and opportunities.
          </p>
        </div>
      )}
    </section>
  );
};

export default UpcomingEvents;
