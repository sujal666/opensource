"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RepositoryIssue } from "@/lib/types";
import Link from "next/link";
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
            <div className={cn("font-medium capitalize", languageColors[language] || 'text-gray-600')}>
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
                difficultyColors[difficulty as keyof typeof difficultyColors] || 'text-gray-600'
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
      
                <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
      
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
      
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
]