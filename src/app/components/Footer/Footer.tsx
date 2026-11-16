import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      icon: FaFacebookF,
      href: "https://facebook.com",
      label: "Facebook",
    },
    {
      icon: FaInstagram,
      href: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: FaXTwitter,
      href: "https://x.com",
      label: "X",
    },
    {
      icon: FaLinkedinIn,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
  ];

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Programmes", href: "/programmes" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="mt-16 border-t border-content-secondary/15 bg-background transition-colors duration-300">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 py-8 md:flex-row md:gap-5">
        {/* Logo */}
        <Link
          href="/"
          aria-label="WeCare Home"
          className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Image
            src="/media/logo.svg"
            alt="WeCare"
            width={120}
            height={40}
            className="h-9 w-auto"
          />
        </Link>

        {/* Navigation */}
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-content-secondary transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Socials & Copyright */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-content-secondary/15 bg-foreground text-content-secondary transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Icon size={16} />
              </Link>
            ))}
          </div>

          {/* Divider */}
          <span className="hidden h-5 w-px bg-content-secondary/20 sm:block" />

          {/* Copyright */}
          <p className="text-center text-xs text-content-secondary">
            © {year} WeCare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
