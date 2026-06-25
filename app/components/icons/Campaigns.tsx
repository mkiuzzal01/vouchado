interface Props {
  size?: number;
  color?: string;
}

export default function Campaigns({ size = 36, color = "#31BFC8" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
    >
      <path
        d="M18 24C21.3137 24 24 21.3137 24 18C24 14.6863 21.3137 12 18 12C14.6863 12 12 14.6863 12 18C12 21.3137 14.6863 24 18 24Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M26.25 9.75L28.71 7.29M7.29 28.71L9.75 26.25M18 6.12V3M18 33V29.88M6.12 18H3M33 18H29.88M9.75 9.75L7.29 7.29M28.71 28.71L26.25 26.25"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
