import { Ref, RefObject } from "react";

export const useDropdownPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {
  const getDropdownPosition = () => {
    if (!ref.current) return { left: 0, top: 0 };
    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 240; // Set your dropdown width here

    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    if (left + dropdownWidth > window.innerWidth) {
      left = rect.right + window.scrollX - dropdownWidth;
    }

    if (left < 0) {
      left = window.innerWidth - dropdownWidth - 16;
    }

    if (left < 0) {
      left = 16;
    }

    return { top, left };
  };

  return { getDropdownPosition };
};
