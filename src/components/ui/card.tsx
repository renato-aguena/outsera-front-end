import React from "react";

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, children, className = "" }: CardProps) {
  return (
    <section
      className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}
    >
      <h2 className="mb-4 text-base font-bold text-slate-800 tracking-tight">
        {title}
      </h2>
      <div className="w-full">{children}</div>
    </section>
  );
}
