"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RepositoryIssue } from "@/lib/types";
import { DIFFICULTY_LABELS, LANGUAGE_LABELS } from "@/lib/constants";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { doc, setDoc } from 'firebase/firestore';

import { useUser } from '@clerk/nextjs';
import { db } from "@/app/firebase/firebaseConfig";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<RepositoryIssue>[] = [
{
  accessorKey: "language",
  header: "Language",
  cell: ({ row }) => {
    const language = row.getValue("language") as string;

    const languageColors: Record<string, string> = {
      JavaScript: 'text-yellow-400',
      TypeScript: 'text-blue-400',
      Python: 'text-green-400',
      Java: 'text-red-400',
      Go: 'text-cyan-400',
      Rust: 'text-orange-400',
      'C++': 'text-gray-300',
      'C#': 'text-purple-300',
      PHP: 'text-indigo-300',
      Ruby: 'text-pink-300',
      Kotlin: 'text-fuchsia-300',
      Swift: 'text-red-300',
      Dart: 'text-sky-400',
      Scala: 'text-rose-400',
      Shell: 'text-neutral-300',
      Perl: 'text-violet-300',
      Haskell: 'text-teal-300',
      Elixir: 'text-amber-300',
    };

    return (
      <div className={cn("font-medium capitalize", languageColors[language] || 'text-gray-400')}>
        {language}
      </div>
    );
  },
},

  {
    accessorKey: "repoName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Repository
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link
        href={row.original.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium hover:underline flex items-center"
      >
        {row.getValue("repoName")}
        <ExternalLink className="ml-2 h-4 w-4" />
      </Link>
    ),
  },

{
  accessorKey: "title",
  header: "Issue",
  cell: ({ row }) => (
    <Link
      href={row.original.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block max-w-[400px] break-words whitespace-normal text-sm font-medium hover:underline"
    >
      {row.getValue("title")}
    </Link>
  ),
},

  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ row }) => {
      const difficulty = row.getValue("difficulty") as string;
      
      const difficultyColors = {
        'good-first-issue': 'text-green-500',
        'beginner-friendly': 'text-green-500',
        'help-wanted': 'text-yellow-500',
        'bug': 'text-red-500',
           'documentation': 'text-indigo-500',
      'question': 'text-purple-500',
      'enhancement': 'text-cyan-500',
      'design': 'text-pink-500',
      'discussion': 'text-blue-500',
      'feature-request': 'text-orange-500',
      };
      
      return (
        <div className={`font-medium ${
          difficultyColors[difficulty as keyof typeof difficultyColors] || 'text-gray-500'
        }`}>
          {difficulty.replace('-', ' ')}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Updated
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const issue = row.original;
      const { user } = useUser();
        const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">

            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(issue.url)}
            >
              View Issue
            </DropdownMenuItem> */}

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href={issue.url} target="_blank" rel="noopener noreferrer">
                View on GitHub
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
  onClick={async () => {
    try {
      const userId = user?.id;
      if (!userId) return alert("Sign in required!");

      const issueRef = doc(db, 'users', userId, 'savedIssues', issue.id);
      await setDoc(issueRef, issue); // Ensure it's saved
      router.push(`/ask-ai?issueId=${issue.id}`);
    } catch (err) {
      console.error("Error preparing AI question:", err);
    }
  }}
>
  Ask Gemini AI
</DropdownMenuItem>

     <DropdownMenuItem
  onClick={async () => {
    try {
      const userId = user?.id;
      if (!userId) return alert("Sign in required!");

      const issueRef = doc(db, 'users', userId, 'savedIssues', issue.id);
      await setDoc(issueRef, issue); // save full issue object

      alert("Issue saved!");
    } catch (err) {
      console.error("Error saving issue:", err);
    }
  }}
>
  Save Issue
</DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DashboardTable({customData, disableFilters = false}: {customData?: RepositoryIssue[], disableFilters?: boolean}) {
  const [data, setData] = useState<RepositoryIssue[]>(customData || []);
  const [loading, setLoading] = useState(true);
  const [languageFilter, setLanguageFilter] = useState("JavaScript");
  const [difficultyFilter, setDifficultyFilter] = useState("good-first-issue");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  
  useEffect(() => {
    if (customData){
      setData(customData);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/issues?language=${languageFilter}&label=${difficultyFilter}`
          // `/api/issues?language=JavaScript&label=${difficultyFilter}`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [languageFilter, difficultyFilter , customData]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    initialState: {
      pagination: {
        pageSize: 10, // Default page size
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      {!disableFilters && (
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
              <DropdownMenuContent className="w-[200px] max-h-[250px] overflow-y-auto bg-neutral-900 border border-neutral-700 shadow-md rounded-md scrollbar-hide">
                {LANGUAGE_LABELS.map((lang) => {
                  const languageColors: Record<string, string> = {
                    JavaScript: "bg-yellow-200 text-yellow-900",
                    TypeScript: "bg-blue-200 text-blue-900",
                    Python: "bg-green-200 text-green-900",
                    Java: "bg-red-200 text-red-900",
                    Go: "bg-cyan-200 text-cyan-900",
                    Rust: "bg-orange-300 text-orange-900",
                    "C++": "bg-gray-300 text-gray-900",
                    "C#": "bg-purple-200 text-purple-900",
                    PHP: "bg-indigo-200 text-indigo-900",
                    Ruby: "bg-pink-200 text-pink-900",
                    Kotlin: "bg-fuchsia-200 text-fuchsia-900",
                    Swift: "bg-red-100 text-red-800",
                    Dart: "bg-sky-200 text-sky-900",
                    Scala: "bg-rose-200 text-rose-900",
                    Shell: "bg-neutral-300 text-neutral-900",
                    Perl: "bg-violet-200 text-violet-900",
                    Haskell: "bg-teal-200 text-teal-900",
                    Elixir: "bg-amber-200 text-amber-900",
                  };

                  const colorClasses = languageColors[lang] || "bg-gray-200 text-gray-800";

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
              <DropdownMenuContent className="w-full max-h-[250px] overflow-y-auto bg-neutral-900 border border-neutral-700 shadow-lg rounded-md scrollbar-hide">
                {DIFFICULTY_LABELS.map((label) => {
                  const difficultyColors: Record<string, string> = {
                    "good-first-issue": "bg-green-100 text-green-900 ",
                    "beginner-friendly": "bg-emerald-300 text-emerald-900",
                    "help-wanted": "bg-yellow-300 text-yellow-900",
                    bug: "bg-red-300 text-red-900",
                    documentation: "bg-indigo-300 text-indigo-900",
                    question: "bg-purple-300 text-purple-900",
                    enhancement: "bg-cyan-300 text-cyan-900",
                    design: "bg-pink-300 text-pink-900",
                    discussion: "bg-blue-300 text-blue-900",
                    "feature-request": "bg-orange-300 text-orange-900",
                  };

                  const colorClasses = difficultyColors[label] || "bg-gray-800 text-gray-300";

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
      )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, rowIndex) => (
                <TableRow key={`skeleton-row-${rowIndex}`}>
                  {columns.map((_, colIndex) => (
                    <TableCell key={`skeleton-cell-${rowIndex}-${colIndex}`}>
                      <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results found. Try changing your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2 py-4">
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
              <span className="sr-only">Go to first page</span>
              <ChevronDown className="rotate-90" />
            </Button>
            <Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              <span className="sr-only">Go to previous page</span>
              &larr;
            </Button>
            <Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              <span className="sr-only">Go to next page</span>
              &rarr;
            </Button>
            <Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
              <span className="sr-only">Go to last page</span>
              <ChevronDown className="-rotate-90" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

