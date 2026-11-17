import Hero from "./components/Pages/Home/HeroSection";
import OurMission from "./components/Pages/Home/OurMission";
import Subscription from "./components/Pages/Home/Subscription";
import UpcomingEvents from "./components/Pages/Home/UpcomingEvents";

export default function HomePage() {
  return (
    <main className="bg-background text-muted">
      <Hero />
      <OurMission />
      <UpcomingEvents />
      <Subscription />
    </main>
  );
}
