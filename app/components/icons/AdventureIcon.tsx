interface Props {
  color?: string;
  size?: number;
}
export default function AdventureIcon({ color = "#454F5B", size = 32 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M21.3327 26.6667H2.66602L6.96544 14.3409C9.06008 8.33586 10.1074 5.33334 11.9993 5.33334C13.7824 5.33334 14.8152 8 16.6815 13.3333"
        stroke={color}
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <path
        d="M8 26.6667H29.3333L23.2088 16.878C21.1741 13.626 20.1568 12 18.6667 12C17.1765 12 16.1592 13.626 14.1245 16.878L12.1712 20"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
