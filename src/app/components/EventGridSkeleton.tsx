import { Skeleton } from "@heroui/react";

export const EventGridSkeleton = () => {
  // Render 6 placeholder cards to fill the initial screen
  const skeletons = Array.from({ length: 6 });

  return (
    <section className="container mx-auto grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
      {skeletons.map((_, i) => (
        <div key={i} className="flex flex-col bg-background">
          {/* Image Placeholder */}
          <Skeleton className="aspect-video w-full" />

          <div className="px-5 pb-0 pt-5 flex-1">
            {/* Title Placeholder */}
            <Skeleton className="mb-2 h-6 w-3/4 rounded-lg" />
            <Skeleton className="mb-4 h-6 w-1/2 rounded-lg" />

            {/* Metadata (Icons) Placeholder */}
            <div className="mt-2 flex flex-wrap justify-between gap-2">
              <Skeleton className="h-4 w-16 rounded-lg" />
              <Skeleton className="h-4 w-20 rounded-lg" />
              <Skeleton className="h-4 w-24 rounded-lg" />
            </div>
          </div>

          {/* Buttons Placeholder */}
          <div className="mt-4 flex gap-2.5">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </section>
  );
};
