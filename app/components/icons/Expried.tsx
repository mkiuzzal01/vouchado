interface Props {
  size?: number;
  color?: string;
}

export default function Expried({ size = 44, color = "#31BFC8" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
    >
      <path
        d="M22 14.208V23.833"
        stroke={color}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M38.6457 15.7304V28.2703C38.6457 30.3237 37.5457 32.2304 35.7674 33.2754L24.8774 39.5637C23.099 40.5904 20.899 40.5904 19.1023 39.5637L8.21233 33.2754C6.434 32.2487 5.33398 30.342 5.33398 28.2703V15.7304C5.33398 13.6771 6.434 11.7703 8.21233 10.7253L19.1023 4.43699C20.8807 3.41033 23.0807 3.41033 24.8774 4.43699L35.7674 10.7253C37.5457 11.7703 38.6457 13.6587 38.6457 15.7304Z"
        stroke={color}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22 29.7002V29.8835"
        stroke={color}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
