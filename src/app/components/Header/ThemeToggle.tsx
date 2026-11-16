// components/ThemeToggle.tsx
"use client";

import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { GoMoon } from "react-icons/go";
import { IoIosSunny } from "react-icons/io";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-10 w-10" />; // placeholder, same size

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      isIconOnly
      aria-label="Toggle theme"
      onPress={() => setTheme(isDark ? "light" : "dark")}
      className="bg-secondary"
    >
      {isDark ? <IoIosSunny /> : <GoMoon />}
    </Button>
  );
}
