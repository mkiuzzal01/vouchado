import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function Cultural({
  size = 64,
  color = "#1B696E",
  ...props
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_14212_7572)">
        <path
          d="M29.5 2.5H22C16.4773 2.5 12 6.97687 12 12.5V37L16 49.25H12V61.5H19.5V12.5C19.5 6.97687 23.9773 2.5 29.5 2.5Z"
          fill="#BFEBEE"
        />

        <path
          d="M37 12.5V22.5M27 22.5V12.5M27 17.5H37"
          stroke="#31BFC8"
          strokeWidth="5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M12 61.5V51.5M12 41.5V12.5C12 6.97713 16.4771 2.5 22 2.5H42C47.5229 2.5 52 6.97713 52 12.5V31.5M52 51.5V61.5M2.5 61.5H61.5M22 31.5H27M37 31.5H42M27 41.5H37M27 61.5V51.5H37V61.5"
          stroke={color}
          strokeWidth="5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M15.5344 50.0353C17.487 48.0827 17.4869 44.9169 15.5343 42.9643C13.5816 41.0117 10.4158 41.0117 8.46321 42.9644C6.51062 44.9171 6.51067 48.0829 8.46333 50.0355C10.416 51.9881 13.5818 51.988 15.5344 50.0353Z"
          stroke={color}
          strokeWidth="5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M55.5344 50.0353C57.487 48.0827 57.4869 44.9169 55.5343 42.9643C53.5816 41.0117 50.4158 41.0117 48.4632 42.9644C46.5106 44.9171 46.5107 48.0829 48.4633 50.0355C50.416 51.9881 53.5818 51.988 55.5344 50.0353Z"
          stroke={color}
          strokeWidth="5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <defs>
        <clipPath id="clip0_14212_7572">
          <rect width="64" height="64" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
