"use client";

import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Placeholder with the same size avoids layout shift before hydration
  if (!mounted) {
    return <Button isIconOnly size="sm" isDisabled aria-label="Toggle theme" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      isIconOnly
      size="sm"
      aria-label="Toggle theme"
      onPress={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <FaSun size={16} /> : <FaMoon size={16} />}
    </Button>
  );
};

export default ThemeToggle;
