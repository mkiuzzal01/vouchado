interface Props {
  size?: number;
  color?: string;
}

export default function Love({ size = 40, color = "#31BFC8" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M21.032 34.6833C20.4654 34.8833 19.532 34.8833 18.9654 34.6833C14.132 33.0333 3.33203 26.15 3.33203 14.4833C3.33203 9.33329 7.48203 5.16663 12.5987 5.16663C15.632 5.16663 18.3154 6.63329 19.9987 8.89996C21.682 6.63329 24.382 5.16663 27.3987 5.16663C32.5154 5.16663 36.6654 9.33329 36.6654 14.4833C36.6654 26.15 25.8654 33.0333 21.032 34.6833Z"
        stroke={color}
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
