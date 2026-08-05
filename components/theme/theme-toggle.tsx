import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  return (
    <Button id="theme-toggle" type="button" variant="ghost" size="icon" aria-label="Toggle color theme" className="rounded-full">
      <Moon className="dark:hidden" aria-hidden="true" />
      <Sun className="hidden dark:block" aria-hidden="true" />
    </Button>
  );
}
