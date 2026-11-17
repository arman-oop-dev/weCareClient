import { Menu } from "@/app/lib/Interface/Menu";
import Image from "next/image";
import Link from "next/link";
import LoginComponent from "./Login";
import Logo from "/public/media/logo.svg";

const HEADER_MENU: Menu[] = [{ label: "Programmes", href: "/programmes" }];

const focusStyles =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-content-secondary/15 bg-background/85 pt-[env(safe-area-inset-top)] backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto grid h-14 w-full max-w-7xl grid-cols-3 items-center gap-3 px-3 sm:h-16 sm:px-6 lg:h-[4.5rem] lg:px-8">
        {/* Logo */}
        <Link
          aria-label="Home"
          className={`shrink-0 rounded-lg ${focusStyles}`}
          href="/"
        >
          <Image
            alt="Logo"
            className="h-7 w-auto min-[400px]:h-8 sm:h-10 lg:h-11"
            preload
            src={Logo}
          />
        </Link>

        {/* Navigation */}
        <nav aria-label="Main navigation" className="flex justify-center">
          <ul className="flex items-center gap-1 sm:gap-2">
            {HEADER_MENU.map((item) => (
              <li key={item.href}>
                <Link
                  className={`inline-flex min-h-10 items-center whitespace-nowrap rounded-lg px-3 text-base font-medium text-content-primary transition-colors duration-200 hover:bg-default-100 hover:text-primary motion-reduce:transition-none sm:px-4 sm:text-base lg:text-lg ${focusStyles}`}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <nav
          aria-label="User navigation"
          className="flex items-center justify-end gap-2 sm:gap-3"
        >
          {/* <ThemeToggle /> */}
          <LoginComponent />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
