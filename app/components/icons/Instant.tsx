interface Props {
  size?: number;
  color?: string;
}

export default function Instant({ size = 20, color = "#637381" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M17.8737 6.83331C17.9173 7.70843 17.9173 8.74948 17.9173 9.99998C17.9173 13.7319 17.9173 15.5979 16.758 16.7573C15.5986 17.9166 13.7326 17.9166 10.0007 17.9166C6.2687 17.9166 4.40273 17.9166 3.24335 16.7573C2.08398 15.5979 2.08398 13.7319 2.08398 9.99998C2.08398 6.26803 2.08398 4.40205 3.24335 3.24268C4.40273 2.08331 6.2687 2.08331 10.0007 2.08331C10.8939 2.08331 11.6803 2.08331 12.3757 2.09921"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M6.66602 9.58331C6.66602 9.58331 7.91602 9.58331 9.58268 12.5C9.58268 12.5 13.7983 4.86109 17.916 3.33331"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
