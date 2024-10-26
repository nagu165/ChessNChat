import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useEffect, useState } from 'react';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="pt-0">
        <header className="border-b">
          <div className="flex h-16 items-center px-4 container mx-auto">
            {/* Render placeholder layout to prevent layout shift */}
            <div className="w-full flex items-center justify-between">
              <div className="w-14 h-14" />
              <h1 className="text-2xl font-bold">ChessNChat</h1>
              <div className="w-14 h-14" />
            </div>
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className="pt-0">
      <header className="border-b">
        <div className="container mx-auto">
          <div className="flex h-16 items-center px-4 relative">
            <div className="absolute left-4">
              <img 
                src="/Logo.jpeg" 
                alt="Image of a nice chess-board" 
                className="w-5 h-5 md:w-14 md:h-14 rounded-lg"
              />
            </div>
            
            <div className="flex-1 flex justify-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                ChessNChat
              </h1>
            </div>
            
            <div className="absolute right-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}