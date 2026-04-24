import type { SVGProps } from "react";

export function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14" {...props}>
      <path
        d="M3 3 L5 3 L6 6 L4.5 7.5 C5.5 9.5 6.5 10.5 8.5 11.5 L10 10 L13 11 L13 13 C13 13.5 12.5 14 12 14 C7 14 2 9 2 4 C2 3.5 2.5 3 3 3 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" {...props}>
      <path fill="currentColor" d="M8 1 L10 6 L15 6 L11 9 L12.5 14 L8 11 L3.5 14 L5 9 L1 6 L6 6 Z" />
    </svg>
  );
}

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14" {...props}>
      <path d="M3 8 L13 8 M9 4 L13 8 L9 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" width="16" height="16" {...props}>
      <path d="M3 8.5 L6.5 12 L13 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
