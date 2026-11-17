import { getProductAPI } from "@/app/api/ProductAPI";
import { EventGridSkeleton } from "@/app/components/EventGridSkeleton";
import ProductCard from "@/app/components/productCard";
import { Suspense } from "react";

const AllProgrammes = async () => {
  const allPrograms = await getProductAPI();

  return (
    <section className="min-h-screen">
      <section className="container mx-auto px-4 pt-12 pb-4 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-primary">
          Explore Opportunities
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-content-primary md:text-5xl">
          All Programmes
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-content-secondary md:text-base">
          Discover events, initiatives, and causes that matter to you. Join a
          community of people making a real difference—one programme at a time.
        </p>
      </section>

      <Suspense fallback={<EventGridSkeleton />}>
        <ProductCard programs={allPrograms} />
      </Suspense>
    </section>
  );
};

export default AllProgrammes;
