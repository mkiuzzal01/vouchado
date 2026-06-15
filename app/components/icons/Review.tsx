interface Props {
  color?: string;
  size?: number;
}

export default function Review({ color = "#31BFC8", size = 40 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M20 3.33334L25.1 14.1667L36.6667 15.8333L28.3333 23.8333L30.6667 35.8333L20 29.6667L9.33333 35.8333L11.6667 23.8333L3.33333 15.8333L14.9 14.1667L20 3.33334Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
