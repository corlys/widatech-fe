import type { ButtonHTMLAttributes } from "react";

export default function Button({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="rounded bg-[#405D72] px-4 py-2 text-white transition-colors hover:bg-[#758694] disabled:bg-red-200"
    >
      {children}
    </button>
  );
}
