"use client";

import { useState } from "react";
import clsx from "clsx";

import DashboardView from "@/components/dashboard";
import ListView from "@/components/list";

enum VIEW_TYPES {
  DASHBOARD = "Painel",
  LIST = "Lista",
}

export default function Home() {
  const [view, setView] = useState<VIEW_TYPES>(VIEW_TYPES.DASHBOARD);
  const onChangeView = () => {
    switch (view) {
      case VIEW_TYPES.LIST:
        return <ListView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <main className="mx-auto w-full h-[calc(100dvh-80px)]">
      <header className="p-4 bg-branding-primary">
        <h1 className="text-2xl font-bold text-slate-100">
          Front-end React Test
        </h1>
      </header>

      <div className="flex flex-col lg:flex-row gap-4 min-h-full ">
        <div className="hidden lg:flex p-6 flex-col gap-4 min-h-full w-1/8 bg-branding-primary/10">
          <ul>
            {Object.values(VIEW_TYPES).map((viewType, index) => (
              <li
                className={clsx("p-1 cursor-pointer", {
                  "text-blue-400": view === viewType,
                })}
                key={index}
                onClick={() => setView(viewType)}
              >
                {viewType}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 flex lg:hidden flex-row gap-4 h-fit w-full items-center place-content-center text-center">
          {Object.values(VIEW_TYPES).map((viewType, index) => (
            <div
              className={clsx(
                "p-2 bg-branding-primary/50 rounded-lg font-bold text-white",
                {
                  "bg-branding-primary!": view === viewType,
                },
              )}
              key={index}
              onClick={() => setView(viewType)}
            >
              {viewType}
            </div>
          ))}
        </div>
        <div className="p-6 w-full h-full">{onChangeView()}</div>
      </div>
    </main>
  );
}
