interface Props {
  size?: number;
  color?: string;
}

export default function Limited({ color = "#31BFC8", size = 36 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
    >
      <path
        d="M3.75 11.25V20.25C3.75 25.9068 3.75 28.7353 5.50736 30.4926C7.26473 32.25 10.0931 32.25 15.75 32.25H20.25C25.9068 32.25 28.7353 32.25 30.4926 30.4926C32.25 28.7353 32.25 25.9068 32.25 20.25V11.25"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.80364 7.97192L3.75 11.25H32.25L30.3717 8.11955C29.0912 5.98532 28.4509 4.9182 27.4192 4.3341C26.3877 3.75 25.1431 3.75 22.6543 3.75H13.4306C10.995 3.75 9.77718 3.75 8.76019 4.31295C7.74322 4.8759 7.0967 5.90791 5.80364 7.97192Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18 11.25V3.75"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 15.75H21"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
