interface Props {
  color?: string;
  size?: number;
}

export default function Clients({ color = "#31BFC8", size = 40 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M20.0007 36.6667C29.2054 36.6667 36.6673 29.2048 36.6673 20C36.6673 10.7953 29.2054 3.33334 20.0007 3.33334C10.7959 3.33334 3.33398 10.7953 3.33398 20C3.33398 29.2048 10.7959 36.6667 20.0007 36.6667Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M13.334 25C14.8542 27.024 17.2745 28.3333 20.0007 28.3333C22.7268 28.3333 25.1472 27.024 26.6673 25"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M25.0007 13.3333C25.0007 13.3333 23.334 15 23.334 16.6667C24.584 15 27.084 15 28.334 16.6667"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M14.9993 13.3333C14.9993 13.3333 16.666 15 16.666 16.6667C15.416 15 12.916 15 11.666 16.6667"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
