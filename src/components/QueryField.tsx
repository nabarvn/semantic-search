"use client";

import { cn } from "@/lib/utils";
import { Loader2, Search } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const QueryField = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get("query") || "";

  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState<string>(defaultQuery);
  const [isSearching, startTransition] = useTransition();

  const clear = () => {
    router.push("/");
    setQuery("");
  };

  const search = () => {
    startTransition(() => {
      router.push(`/search?query=${query}`);
    });
  };

  return (
    <div className="flex flex-col bg-white w-full h-14">
      <div className="relative rounded-md h-14 z-10">
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="absolute inset-0 h-full"
          disabled={isSearching}
          onKeyDown={(e) => {
            if (e.key === "Enter" && query !== "" && !isSearching) {
              search();
            }

            if (e.key === "Escape") {
              inputRef?.current?.blur();
            }
          }}
        />

        <Button
          size="sm"
          variant="ghost"
          onClick={clear}
          className={cn(
            "absolute right-[48px] inset-y-0 h-full text-muted-foreground rounded-none",
            {
              hidden: !query,
            }
          )}
        >
          Clear
        </Button>

        <Button
          size="sm"
          onClick={search}
          disabled={isSearching || !query}
          className="absolute right-0 inset-y-0 h-full rounded-l-none"
        >
          {isSearching ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <Search className="h-6 w-6" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default QueryField;
