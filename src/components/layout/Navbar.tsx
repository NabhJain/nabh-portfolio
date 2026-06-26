import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { primaryNav } from "@/data/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/libs/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto max-w-6xl px-4">
        <nav
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300",
            scrolled ? "glass-strong shadow-elevated" : "glass",
          )}
          aria-label="Primary"
        >
          <Link
            to="/"
            className="group flex items-center gap-2 font-display text-sm font-semibold tracking-tight"
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-electric to-purple text-[10px] font-bold text-primary-foreground shadow-glow">
              {profile.initials}
            </span>
            <span className="hidden sm:inline">{profile.name}</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {primaryNav.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname === item.to || pathname.startsWith(item.to + "/");
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors",
                      active
                        ? "bg-white/10 text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              to="/assistant"
              className="hidden items-center gap-1.5 rounded-lg bg-gradient-to-br from-electric/90 to-purple/90 px-3 py-1.5 text-[13px] font-semibold text-primary-foreground transition-all hover:shadow-glow md:inline-flex"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Ask AI
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-lg text-foreground transition-colors hover:bg-white/10 md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="glass-strong mt-2 rounded-2xl p-2 md:hidden">
            <ul className="flex flex-col">
              {primaryNav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
