"use client";

import { Card } from "@heroui/react";
import { MdJoinRight } from "react-icons/md";
import { SiEventstore } from "react-icons/si";
import { SlEvent } from "react-icons/sl";

const mission = [
  {
    icon: SiEventstore,
    title: "Discover Programmes",
    description:
      "Find meaningful programmes around you and support causes that deserve your attention.",
  },
  {
    icon: SlEvent,
    title: "Create an Event",
    description:
      "Turn your ideas into action. Create an event and bring people together for something good.",
  },
  {
    icon: MdJoinRight,
    title: "Join the Community",
    description:
      "Meet people who care, share your time, and become part of a community that makes a difference.",
  },
];

const OurMission = () => {
  return (
    <section className="container mx-auto mt-12 px-4 sm:mt-16">
      {/* Section Header */}
      <div className="mb-8 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-primary">
          What We Do
        </p>

        <h2 className="text-3xl font-bold tracking-tight text-content-primary md:text-4xl">
          Our Mission
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-content-secondary md:text-base">
          We bring people together to create meaningful experiences and make a
          positive impact in our communities.
        </p>
      </div>

      {/* Mission Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {mission.map((item, index) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-content-secondary/15 bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_15px_40px_rgba(255,52,125,0.10)] motion-reduce:transition-none"
            >
              <Card.Header className="flex flex-col items-start gap-5 p-0">
                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                  <Icon size={27} />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold tracking-widest text-primary">
                    0{index + 1} / MISSION
                  </span>

                  <Card.Title className="text-xl font-bold text-content-primary">
                    {item.title}
                  </Card.Title>

                  <Card.Description className="text-sm leading-7 text-content-secondary">
                    {item.description}
                  </Card.Description>
                </div>
              </Card.Header>

              {/* Bottom Accent */}
              <div className="mt-6 h-1 w-12 rounded-full bg-primary/30 transition-all duration-300 group-hover:w-20 group-hover:bg-primary" />

              {/* Decorative Background */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/5 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default OurMission;
