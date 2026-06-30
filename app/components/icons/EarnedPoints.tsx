interface Props {
  size?: number;
  color?: string;
}

export default function EarnedPoints({ size = 32, color = "#00CA80" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M18.6667 24C24.5577 24 29.3333 19.2244 29.3333 13.3333C29.3333 7.44225 24.5577 2.66663 18.6667 2.66663C12.7756 2.66663 8 7.44225 8 13.3333C8 19.2244 12.7756 24 18.6667 24Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M17.5552 27.9585C16.0833 28.8318 14.3649 29.3333 12.5293 29.3333C7.08198 29.3333 2.66602 24.9173 2.66602 19.47C2.66602 17.6344 3.16744 15.916 4.04078 14.4441"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M15 11L19 17L23 11"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
