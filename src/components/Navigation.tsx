
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Home,
  BookOpenText,
  Heart,
  Wind,
  SmilePlus,
  Sparkles,
  HelpCircle,
  Menu,
  X
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const routes = [
  { path: "/", label: "Home", icon: Home },
  { path: "/journal", label: "Journal", icon: BookOpenText },
  { path: "/resources", label: "Resources", icon: Heart },
  { path: "/breathing", label: "Breathing", icon: Wind },
  { path: "/mood", label: "Mood Tracker", icon: SmilePlus },
  { path: "/meditation", label: "Meditation", icon: Sparkles },
  { path: "/faq", label: "FAQ", icon: HelpCircle },
];

export function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const NavLinks = () => (
    <>
      {routes.map((route) => {
        const Icon = route.icon;
        const isActive = location.pathname === route.path;
        return (
          <Link key={route.path} to={route.path}>
            <Button
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-2",
                isActive ? "bg-primary text-primary-foreground" : ""
              )}
            >
              <Icon className="h-4 w-4" />
              {route.label}
            </Button>
          </Link>
        );
      })}
    </>
  );

  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-between p-4 border-b">
        <Link to="/" className="font-semibold text-lg">
          MindEase
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="py-4 flex flex-col gap-1">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex border-r p-4 flex-col h-screen sticky top-0">
        <div className="font-semibold text-xl mb-6">MindEase</div>
        <div className="flex flex-col gap-1 flex-1">
          <NavLinks />
        </div>
        <div className="mt-auto pt-4 border-t">
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}

export default Navigation;
