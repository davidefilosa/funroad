"use client";

import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import { useState } from "react";
const MAX_RATING = 5;
const MIN_RATING = 0;

interface StarPickerProps {
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

export const StarPicker = ({
  value,
  onChange,
  disabled,
  className,
}: StarPickerProps) => {
  const safeRating = Math.max(MIN_RATING, Math.min(MAX_RATING, value || 0));
  const [hoveredValue, setHoveredValue] = useState<number>(0);

  return (
    <div
      className={cn(
        "flex items-center gap-x-1",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {Array.from({ length: MAX_RATING }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => {
            onChange?.(index + 1);
          }}
          disabled={disabled}
          className={cn(
            "p-0.5 hover:scale-110 transition",
            !disabled && "cursor-pointer"
          )}
          onMouseEnter={() => setHoveredValue(index + 1)}
          onMouseLeave={() => setHoveredValue(value || 0)}
        >
          <StarIcon
            className={cn(
              "size-5 hover:scale-110 transition",
              index < safeRating ? "fill-black stroke-black" : "",
              index < hoveredValue ? "fill-black stroke-black" : ""
            )}
          />
        </button>
      ))}
    </div>
  );
};
