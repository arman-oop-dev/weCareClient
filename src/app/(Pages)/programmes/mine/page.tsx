"use client";

import MyParticipateEvent from "@/app/components/MyProfile/MyParticipateEvent";
import MyPost from "@/app/components/MyProfile/MyPost";
import { Tabs } from "@heroui/react";

const listClassName = [
  "rounded-xl border border-content-secondary/15 bg-primary/5 p-1",

  "**:data-[slot=tabs-tab]:rounded-lg",
  "**:data-[slot=tabs-tab]:bg-transparent",
  "**:data-[slot=tabs-tab]:text-content-secondary",
  "**:data-[slot=tabs-tab]:opacity-100",
  "**:data-[slot=tabs-tab]:transition-colors",

  "**:data-[slot=tabs-tab]:data-[hovered=true]:not-data-[selected=true]:bg-primary/10",
  "**:data-[slot=tabs-tab]:data-[hovered=true]:not-data-[selected=true]:text-primary",

  "**:data-[slot=tabs-tab]:data-[pressed=true]:not-data-[selected=true]:bg-primary/15",

  "**:data-[slot=tabs-tab]:data-[focus-visible=true]:ring-2",
  "**:data-[slot=tabs-tab]:data-[focus-visible=true]:ring-primary/20",

  "**:data-[slot=tabs-tab]:data-[selected=true]:font-semibold",
  "**:data-[slot=tabs-tab]:data-[selected=true]:text-white",

  "**:data-[slot=tabs-tab]:shadow-none",

  "**:data-[slot=tabs-indicator]:rounded-lg",
  "**:data-[slot=tabs-indicator]:bg-primary",
  "**:data-[slot=tabs-indicator]:shadow-none",
].join(" ");

const Page = () => {
  return (
    <section className="container mx-auto mt-2.5 px-4">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-content-primary md:text-6xl">
          My activity
        </h1>
        <p className="mt-3 text-base leading-relaxed text-content-secondary md:text-lg">
          Manage the events you have posted and the ones you have joined.
        </p>
      </header>

      <Tabs className="mt-6 w-full" defaultSelectedKey="myEvent">
        {/* Only the tab bar is narrow; the panels use the full width */}
        <Tabs.ListContainer className="w-full max-w-sm rounded-none bg-transparent">
          <Tabs.List aria-label="My activity" className={listClassName}>
            <Tabs.Tab id="myEvent">
              My Events
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="participateEvents">
              Participate Events
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>

        <Tabs.Panel className="pt-4" id="myEvent">
          <MyPost />
        </Tabs.Panel>

        <Tabs.Panel className="pt-4" id="participateEvents">
          <MyParticipateEvent />
        </Tabs.Panel>
      </Tabs>
    </section>
  );
};

export default Page;
