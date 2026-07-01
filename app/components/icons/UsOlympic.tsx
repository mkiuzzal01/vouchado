interface Props {
  color?: string;
  size?: number;
}

export default function UsOlympic({ color = "#31BFC8", size = 40 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M26.6654 33.3332H3.33203L8.70631 17.926C11.3246 10.4197 12.6338 6.6665 14.9987 6.6665C17.2275 6.6665 18.5185 9.99984 20.8514 16.6665"
        stroke={color}
        stroke-width="2"
        stroke-linejoin="round"
      />
      <path
        d="M10 33.3333H36.6667L29.011 21.0975C26.4677 17.0325 25.196 15 23.3333 15C21.4707 15 20.199 17.0325 17.6557 21.0975L15.214 25"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
