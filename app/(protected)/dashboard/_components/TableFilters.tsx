"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGE_LABELS, DIFFICULTY_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface TableFiltersProps {
  languageFilter: string;
  setLanguageFilter: (value: string) => void;
  difficultyFilter: string;
  setDifficultyFilter: (value: string) => void;
}

export function TableFilters({ languageFilter, setLanguageFilter, difficultyFilter, setDifficultyFilter }: TableFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 py-4">
      {/* Language Filter */}
      <div className="flex-1 space-y-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              {languageFilter || "Select language..."}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full max-h-[250px] overflow-y-auto bg-gray-800 border-gray-700 shadow-md rounded-md scrollbar-hide">
            {LANGUAGE_LABELS.map((lang) => {
              const languageColors: Record<string, string> = {
                JavaScript: "bg-yellow-900/50 text-yellow-300",
                TypeScript: "bg-blue-900/50 text-blue-300",
                Python: "bg-green-900/50 text-green-300",
                Java: "bg-red-900/50 text-red-300",
                Go: "bg-cyan-900/50 text-cyan-300",
                Rust: "bg-orange-900/50 text-orange-300",
                "C++": "bg-gray-700/50 text-gray-300",
                "C#": "bg-purple-900/50 text-purple-300",
                PHP: "bg-indigo-900/50 text-indigo-300",
                Ruby: "bg-pink-900/50 text-pink-300",
                Kotlin: "bg-fuchsia-900/50 text-fuchsia-300",
                Swift: "bg-red-800/50 text-red-200",
                Dart: "bg-sky-900/50 text-sky-300",
                Scala: "bg-rose-900/50 text-rose-300",
                Shell: "bg-neutral-700/50 text-neutral-300",
                Perl: "bg-violet-900/50 text-violet-300",
                Haskell: "bg-teal-900/50 text-teal-300",
                Elixir: "bg-amber-900/50 text-amber-300",
              };

              const colorClasses = languageColors[lang] || "bg-gray-700 text-gray-300";

              return (
                <DropdownMenuItem
                  key={lang}
                  onClick={() => setLanguageFilter(lang)}
                  className={cn(
                    "cursor-pointer transition-all mt-1 px-2 py-1 rounded-md w-full text-center transform",
                    colorClasses,
                    "!hover:bg-inherit !hover:text-inherit"
                  )}
                >
                  <span className="block w-full font-medium text-sm capitalize">{lang}</span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Difficulty Filter */}
      <div className="flex-1 space-y-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              {difficultyFilter.replace("-", " ") || "Select difficulty..."}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full max-h-[250px] overflow-y-auto bg-gray-800 border-gray-700 shadow-lg rounded-md scrollbar-hide">
            {DIFFICULTY_LABELS.map((label) => {
              const difficultyColors: Record<string, string> = {
                "good-first-issue": "bg-green-900/50 text-green-300",
                "beginner-friendly": "bg-emerald-800/50 text-emerald-300",
                "help-wanted": "bg-yellow-800/50 text-yellow-300",
                bug: "bg-red-800/50 text-red-300",
                documentation: "bg-indigo-800/50 text-indigo-300",
                question: "bg-purple-800/50 text-purple-300",
                enhancement: "bg-cyan-800/50 text-cyan-300",
                design: "bg-pink-800/50 text-pink-300",
                discussion: "bg-blue-800/50 text-blue-300",
                "feature-request": "bg-orange-800/50 text-orange-300",
              };

              const colorClasses = difficultyColors[label] || "bg-gray-700 text-gray-300";

              return (
                <DropdownMenuItem
                  key={label}
                  onClick={() => setDifficultyFilter(label)}
                  className={cn(
                    "cursor-pointer transition-colors mt-1 px-2 py-1 rounded-md w-full text-center",
                    colorClasses,
                    "hover:-translate-y-0.5 hover:shadow-md hover:ring-1 hover:ring-white/20"
                  )}
                >
                  <span className="block w-full font-medium text-sm capitalize">
                    {label.replace("-", " ")}
                  </span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
