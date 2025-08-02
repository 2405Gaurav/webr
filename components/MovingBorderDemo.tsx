"use client";
import React from "react";
import { Button } from "./ui/moving-border";
import Image from "next/image";

export function MovingBorderDemo() {
  return (
    <div>
      <Button
        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 p-0 overflow-hidden"
      >
        <div className="bg-slate-700 flex items-center justify-center w-full h-full p-2">
          <div className="relative w-full h-full">
            <Image 
              src="/logos/webber-logo.png" 
              alt="Logo" 
              fill
              className="object-contain"
              sizes="(max-width: 160px) 100vw, 160px"
            />
          </div>
        </div>
      </Button>
    </div>
  );
}