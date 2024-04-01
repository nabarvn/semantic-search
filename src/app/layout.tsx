import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Icons, QueryField } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Semantic Search",
  description: "A unique looking search engine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased hydrated">
      <body className={cn(inter.className, "text-foreground")}>
        <div className="relative min-h-screen isolate overflow-hidden border-b border-gray-200 bg-white">
          <svg
            className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>

            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
            />
          </svg>

          <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex gap-16 lg:px-8 lg:py-24">
            <div className="flex flex-col h-full w-full items-center gap-4">
              <Icons.Sparkles className="h-12 w-12" />

              <h1 className="tracking-tight text-3xl sm:text-5xl font-bold">
                Semantic Search
              </h1>

              <p className="max-w-xl text-center text-lg text-slate-700">
                An elegantly crafted hybrid search engine that enriches search
                precision through queries for semantically linked results.
              </p>

              <div className="flex flex-col w-full mx-auto max-w-2xl mt-16">
                <QueryField />
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
