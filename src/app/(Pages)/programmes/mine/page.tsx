"use client";

import MyParticipateEvent from "@/app/components/MyProfile/MyParticipateEvent";
import MyPost from "@/app/components/MyProfile/MyPost";
import { useRef, useState } from "react";

type TabId = "my-events" | "my-participations";

const iconProps = {
  viewBox: "0 0 24 24",
  className: "size-5",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const tabs: {
  id: TabId;
  title: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "my-events",
    title: "My Events",
    description: "Events you have posted. Review, edit or remove them here.",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4.5" width="18" height="16" rx="3" />
        <path d="M3 9.5h18M8 3v3M16 3v3M12 13v4M10 15h4" />
      </svg>
    ),
  },
  {
    id: "my-participations",
    title: "My Participations",
    description: "Events you have joined, all in one place.",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12.5 2.8 2.8L16.5 9.5" />
      </svg>
    ),
  },
];

const page = () => {
  const [active, setActive] = useState<TabId>("my-events");

  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({
    "my-events": null,
    "my-participations": null,
  });

  const current = tabs.find((t) => t.id === active)!;

  // Arrow keys / Home / End move between tabs
  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next = index;

    if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (e.key === "ArrowLeft")
      next = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;

    e.preventDefault();
    setActive(tabs[next].id);
    tabRefs.current[tabs[next].id]?.focus();
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-background text-content-primary transition-colors duration-300">
      {/* Soft brand glow behind the header */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(255,52,125,0.12),transparent)]"
      />

      <div className="container mx-auto px-4 pb-20 pt-10 md:pt-16">
        {/* Page Header */}
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-content-primary md:text-6xl">
            My Activity
          </h1>

          <p className="mt-3 text-base leading-relaxed text-content-secondary md:text-lg">
            Manage the events you have posted and the ones you have joined.
          </p>
        </header>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="My activity"
          className="mt-8 inline-flex w-full max-w-md gap-1 rounded-2xl border border-content-secondary/15 bg-foreground p-1 shadow-sm transition-colors duration-300 sm:w-auto"
        >
          {tabs.map((t, i) => {
            const selected = t.id === active;

            return (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[t.id] = el;
                }}
                role="tab"
                id={`tab-${t.id}`}
                type="button"
                aria-selected={selected}
                aria-controls={`panel-${t.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(t.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:flex-none sm:px-5 ${
                  selected
                    ? "bg-secondary text-white shadow-md shadow-secondary/20"
                    : "text-content-secondary hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {t.icon}
                <span>{t.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Panel */}
        <section
          role="tabpanel"
          id={`panel-${active}`}
          aria-labelledby={`tab-${active}`}
          tabIndex={0}
          className="mt-8 outline-none md:mt-10"
        >
          <div className="border-b border-content-secondary/15 pb-5">
            <h2 className="text-2xl font-bold tracking-tight text-content-primary md:text-4xl">
              {current.title}
            </h2>

            <p className="mt-1 text-sm text-content-secondary md:text-base">
              {current.description}
            </p>
          </div>

          <div className="pt-6 md:pt-8">
            {active === "my-events" ? <MyPost /> : <MyParticipateEvent />}
          </div>
        </section>
      </div>
    </main>
  );
};

export default page;
