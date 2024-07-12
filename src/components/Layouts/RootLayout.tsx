import { type ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#F7E7DC] to-[#FFF8F3] text-white">
      {children}
    </main>
  );
}
