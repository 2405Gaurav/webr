"use client";
import React, { useRef, ComponentProps, ElementType } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

type ButtonProps<T extends ElementType = "button"> = {
  borderRadius?: string;
  children: React.ReactNode;
  as?: T;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
} & Omit<ComponentProps<T>, keyof {
  borderRadius?: string;
  children: React.ReactNode;
  as?: T;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
}>;

export function Button<T extends ElementType = "button">({
  borderRadius = "0",
  children,
  as,
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: ButtonProps<T>) {
  const Component = as || "button";
  
  return (
    <Component
      className={cn(
        "relative h-16 w-40 overflow-hidden bg-transparent p-[1px] text-xl",
        containerClassName
      )}
      style={{ borderRadius }}
      {...otherProps}
    >
      <div className="absolute inset-0" style={{ borderRadius }}>
        <MovingBorder duration={duration} rx="0%" ry="0%">
          <div
            className={cn(
              "h-20 w-20 bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-[0.8]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/[0.8] text-sm text-white antialiased backdrop-blur-xl",
          className
        )}
        style={{ borderRadius }}
      >
        {children}
      </div>
    </Component>
  );
}

type MovingBorderProps = {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
} & Omit<React.SVGProps<SVGSVGElement>, 'children' | 'duration' | 'rx' | 'ry'>;

export const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}: MovingBorderProps) => {
  const pathRef = useRef<SVGRectElement | null>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength?.();
    if (length) {
      const pxPerMs = length / duration;
      progress.set((time * pxPerMs) % length);
    }
  });

  const x = useTransform(progress, (val) =>
    pathRef.current?.getPointAtLength(val).x ?? 0
  );
  const y = useTransform(progress, (val) =>
    pathRef.current?.getPointAtLength(val).y ?? 0
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};