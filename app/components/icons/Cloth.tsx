interface Props {
  color?: string;
  size?: number;
}

export default function Cloth({ color = "#0D9488", size = 12 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M2.08519 7.6499L4.35019 9.9149C5.28019 10.8449 6.79019 10.8449 7.72519 9.9149L9.92019 7.7199C10.8502 6.7899 10.8502 5.2799 9.92019 4.3449L7.65019 2.0849C7.17519 1.6099 6.52019 1.3549 5.85019 1.3899L3.35019 1.5099C2.35019 1.5549 1.55519 2.3499 1.50519 3.3449L1.38519 5.8449C1.35519 6.5199 1.61019 7.1749 2.08519 7.6499Z"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.75 6C5.44036 6 6 5.44036 6 4.75C6 4.05964 5.44036 3.5 4.75 3.5C4.05964 3.5 3.5 4.05964 3.5 4.75C3.5 5.44036 4.05964 6 4.75 6Z"
        stroke={color}
        stroke-linecap="round"
      />
    </svg>
  );
}
